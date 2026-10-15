"""
FTP deploy for mastersfc.digiskills.live.

Reads credentials from .env.deploy (gitignored). Mirrors ./dist to the
remote target path (removes stale files first). Writes .htaccess for SPA
fallback before uploading.

Usage:
    python deploy.py
"""
import os
import sys
from ftplib import FTP, FTP_TLS, error_perm
from pathlib import Path

ROOT = Path(__file__).parent


def load_env():
    env_path = ROOT / ".env.deploy"
    if not env_path.exists():
        sys.exit(f".env.deploy missing. Expected at {env_path}")
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())


load_env()

FTP_HOST = os.environ["FTP_HOST"]
FTP_PORT = int(os.environ.get("FTP_PORT", "21"))
FTP_USER = os.environ["FTP_USER"]
FTP_PASS = os.environ["FTP_PASS"]
FTP_TLS_MODE = os.environ.get("FTP_TLS", "auto").lower()
REMOTE_DIR = os.environ["FTP_REMOTE_DIR"]
LOCAL_DIR = ROOT / "dist"

if not LOCAL_DIR.is_dir():
    sys.exit(f"dist/ not found. Run `npm run build` first. Looked at {LOCAL_DIR}")

(LOCAL_DIR / ".htaccess").write_text(
    "<IfModule mod_rewrite.c>\n"
    "  RewriteEngine On\n"
    "  RewriteBase /\n"
    "  RewriteRule ^index\\.html$ - [L]\n"
    "  RewriteCond %{REQUEST_FILENAME} !-f\n"
    "  RewriteCond %{REQUEST_FILENAME} !-d\n"
    "  RewriteRule . /index.html [L]\n"
    "</IfModule>\n"
)


def connect():
    if FTP_TLS_MODE in ("off", "none", "false", "0"):
        print(f"Connecting FTP {FTP_USER}@{FTP_HOST}:{FTP_PORT} (plaintext)", flush=True)
        f = FTP()
        f.connect(FTP_HOST, FTP_PORT, timeout=30)
        f.login(FTP_USER, FTP_PASS)
        return f
    try:
        print(f"Connecting FTPS (explicit) {FTP_USER}@{FTP_HOST}:{FTP_PORT}", flush=True)
        f = FTP_TLS()
        f.connect(FTP_HOST, FTP_PORT, timeout=30)
        f.auth()
        f.login(FTP_USER, FTP_PASS)
        f.prot_p()
        return f
    except Exception as e:
        if FTP_TLS_MODE == "require":
            raise
        print(f"FTPS failed ({e}); falling back to plain FTP", flush=True)
        f = FTP()
        f.connect(FTP_HOST, FTP_PORT, timeout=30)
        f.login(FTP_USER, FTP_PASS)
        return f


def ensure_cwd(ftp, path):
    parts = path.strip("/").split("/")
    ftp.cwd("/")
    for p in parts:
        try:
            ftp.cwd(p)
        except error_perm:
            ftp.mkd(p)
            ftp.cwd(p)


def is_dir(ftp, name):
    cur = ftp.pwd()
    try:
        ftp.cwd(name)
        ftp.cwd(cur)
        return True
    except error_perm:
        return False


def rm_tree(ftp, path):
    try:
        ftp.cwd(path)
    except error_perm:
        return
    names = []
    try:
        names = ftp.nlst()
    except error_perm:
        names = []
    for n in names:
        if n in (".", ".."):
            continue
        if is_dir(ftp, n):
            rm_tree(ftp, f"{path}/{n}")
            try:
                ftp.rmd(n)
            except error_perm:
                pass
        else:
            try:
                ftp.delete(n)
            except error_perm:
                pass


ftp = connect()
print(f"Ensuring remote dir {REMOTE_DIR}", flush=True)
ensure_cwd(ftp, REMOTE_DIR)
print(f"Clearing contents of {REMOTE_DIR}", flush=True)
rm_tree(ftp, REMOTE_DIR)

uploaded = 0
for root, _, files in os.walk(LOCAL_DIR):
    rel = os.path.relpath(root, LOCAL_DIR).replace("\\", "/")
    remote_root = REMOTE_DIR if rel == "." else f"{REMOTE_DIR}/{rel}"
    ensure_cwd(ftp, remote_root)
    for f in files:
        local_path = Path(root) / f
        with open(local_path, "rb") as fp:
            ftp.storbinary(f"STOR {f}", fp)
        uploaded += 1
        print(f"  up: {remote_root}/{f}", flush=True)

print(f"Done. {uploaded} files uploaded.", flush=True)
print(f"Site: {os.environ.get('SITE_URL', '')}", flush=True)
ftp.quit()
