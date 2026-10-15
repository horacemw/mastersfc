"""
Deploy mastersfc.digiskills.live via GitHub + Hostinger Git integration.

Flow:
  1. Rebuild dist/
  2. Commit any pending source changes to main and push
  3. Rebuild `deploy` branch (dist contents at root) and push it
  4. Remind the user to click "Deploy" in hPanel (Hostinger pulls on demand,
     not on push for this plan)

Usage:
    npm run deploy
    python deploy.py --message "fix hero copy"
"""
import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent


def run(cmd, check=True, capture=False):
    print(f"$ {' '.join(cmd) if isinstance(cmd, list) else cmd}", flush=True)
    r = subprocess.run(
        cmd,
        cwd=ROOT,
        shell=isinstance(cmd, str),
        check=check,
        text=True,
        capture_output=capture,
    )
    if capture:
        return (r.stdout or "") + (r.stderr or "")
    return ""


def git(*args, check=True, capture=False):
    return run(["git", *args], check=check, capture=capture)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-m", "--message", default="deploy: update site", help="commit message")
    ap.add_argument("--skip-build", action="store_true", help="skip npm run build")
    args = ap.parse_args()

    if not args.skip_build:
        print("--- Building ---", flush=True)
        run("npm run build")

    htaccess = ROOT / "dist" / ".htaccess"
    htaccess.write_text(
        "<IfModule mod_rewrite.c>\n"
        "  RewriteEngine On\n"
        "  RewriteBase /\n"
        "  RewriteRule ^index\\.html$ - [L]\n"
        "  RewriteCond %{REQUEST_FILENAME} !-f\n"
        "  RewriteCond %{REQUEST_FILENAME} !-d\n"
        "  RewriteRule . /index.html [L]\n"
        "</IfModule>\n"
    )

    print("--- Updating main branch ---", flush=True)
    status = git("status", "--porcelain", capture=True).strip()
    if status:
        git("add", "-A")
        git("commit", "-m", args.message)
    else:
        print("(no source changes to commit)", flush=True)
    git("push", "origin", "main")

    print("--- Rebuilding deploy branch from dist/ ---", flush=True)
    git("branch", "-D", "deploy", check=False)
    git("subtree", "split", "--prefix", "dist", "-b", "deploy")
    git("push", "origin", "deploy", "--force-with-lease")

    print("", flush=True)
    print("=" * 60, flush=True)
    print("Pushed. Final step (manual):", flush=True)
    print("  hPanel -> mastersfc.digiskills.live -> Advanced -> Git", flush=True)
    print("  -> click 'Deploy'", flush=True)
    print("", flush=True)
    print("Verify: https://mastersfc.digiskills.live", flush=True)
    print("=" * 60, flush=True)


if __name__ == "__main__":
    main()
