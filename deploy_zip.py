"""
Fallback: build + zip for manual upload via hPanel File Manager.
Produces mastersfc-deploy.zip (contains dist/* and .htaccess, no top-level folder).
"""
import shutil
import sys
from pathlib import Path
import zipfile

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
ZIP = ROOT / "mastersfc-deploy.zip"

if not DIST.is_dir():
    sys.exit("dist/ not found. Run `npm run build` first.")

HTACCESS = DIST / ".htaccess"
HTACCESS.write_text(
    "<IfModule mod_rewrite.c>\n"
    "  RewriteEngine On\n"
    "  RewriteBase /\n"
    "  RewriteRule ^index\\.html$ - [L]\n"
    "  RewriteCond %{REQUEST_FILENAME} !-f\n"
    "  RewriteCond %{REQUEST_FILENAME} !-d\n"
    "  RewriteRule . /index.html [L]\n"
    "</IfModule>\n"
)

if ZIP.exists():
    ZIP.unlink()

count = 0
with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    for p in DIST.rglob("*"):
        if p.is_file():
            z.write(p, p.relative_to(DIST).as_posix())
            count += 1

size_mb = ZIP.stat().st_size / (1024 * 1024)
print(f"Wrote {ZIP} ({count} files, {size_mb:.2f} MB)")
print("Upload via hPanel -> File Manager -> public_html/mastersfc, then Extract.")
