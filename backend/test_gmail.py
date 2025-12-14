# test_gmail.py - Test your Gmail credentials

import smtplib
from dotenv import load_dotenv
import os

load_dotenv()

email = os.getenv("SENDER_EMAIL")
password = os.getenv("SENDER_PASSWORD")

print("=" * 60)
print("🧪 Testing Gmail Credentials")
print("=" * 60)
print(f"\n📧 Email: {email}")
print(f"🔑 Password: {password}")
print(f"   Length: {len(password)} characters")

if not email or not password:
    print("\n❌ ERROR: SENDER_EMAIL or SENDER_PASSWORD not found in .env")
    print("   Create .env file with:")
    print("   SENDER_EMAIL=your-email@gmail.com")
    print("   SENDER_PASSWORD=your-16-char-password")
    exit()

print("\n🔄 Attempting to connect to Gmail SMTP...")

try:
    print("   Connecting to smtp.gmail.com:465...")
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=10)
    print("   ✅ Connected!")
    
    print("   Logging in...")
    server.login(email, password)
    print("   ✅ Logged in!")
    
    server.quit()
    print("\n✅ SUCCESS! Your Gmail credentials are correct!")
    print("   You can now send emails.")
    
except smtplib.SMTPAuthenticationError as e:
    print(f"\n❌ AUTHENTICATION FAILED!")
    print(f"   Error: {e}")
    print("\n   Solutions:")
    print("   1. Check if 2-Factor Authentication is enabled:")
    print("      https://myaccount.google.com/security")
    print("   2. Regenerate App Password:")
    print("      https://myaccount.google.com/apppasswords")
    print("   3. Make sure you're using App Password (not regular password)")
    print("   4. Copy password WITH SPACES")
    print("   5. Update .env and restart backend")
    
except smtplib.SMTPException as e:
    print(f"\n❌ SMTP ERROR: {e}")
    print("   Check your internet connection")
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")
    print("   Check your credentials")