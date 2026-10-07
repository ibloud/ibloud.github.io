from pathlib import Path
from html import escape
import subprocess

root = Path(__file__).parent.parent / 'assets' / 'project-directory'
root.mkdir(parents=True, exist_ok=True)
font = 'DejaVu Sans'

def hero(slug, name, tagline, steps, accent):
    lines = ''.join(f'<g transform="translate(650,{270+i*125})"><rect width="800" height="100" rx="18" fill="#20232f" stroke="#40465a"/><circle cx="52" cy="50" r="22" fill="{accent}"/><text x="52" y="58" text-anchor="middle" fill="#11131b" font-size="24" font-weight="bold">{i+1}</text><text x="98" y="58" fill="#f3f4f6" font-size="29">{escape(s)}</text></g>' for i,s in enumerate(steps))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#10121a"/><rect x="50" y="50" width="1500" height="800" rx="34" fill="#171a25" stroke="#34394c"/><g font-family="{font}"><text x="120" y="150" fill="{accent}" font-size="25" letter-spacing="5">LOPTR LAB</text><text x="120" y="230" fill="#f8fafc" font-size="53" font-weight="bold">{escape(name)}</text><text x="120" y="305" fill="#bfc8dc" font-size="28">{escape(tagline[0])}</text><text x="120" y="345" fill="#bfc8dc" font-size="28">{escape(tagline[1])}</text><rect x="120" y="425" width="370" height="64" rx="32" fill="{accent}"/><text x="305" y="466" text-anchor="middle" fill="#11131b" font-size="24" font-weight="bold">READ-ONLY · PUBLIC DATA</text><text x="120" y="590" fill="#f8fafc" font-size="32">Your choices stay yours.</text><text x="120" y="640" fill="#bfc8dc" font-size="23">No sign-in or automatic publishing.</text><text x="900" y="150" fill="#bfc8dc" font-size="21" letter-spacing="2">ILLUSTRATIVE WORKFLOW</text>{lines}<text x="120" y="785" fill="#bfc8dc" font-size="23">Creator ownership · Clear sources · Space for understanding</text></g></svg>'''
    path=root/f'{slug}-hero.svg'; path.write_text(svg)
    subprocess.run(['inkscape',str(path),'--export-type=png','--export-filename='+str(root/f'{slug}-hero.png')], check=True, capture_output=True)

hero('story-finder','Made Sick Story Finder',('Find the story in a','public Bluesky author feed.'),('Choose a public author','Filter words, phrase and date','Select source references','Export a local story ledger'),'#70e0ed')
hero('pixie-discovery','Pixie Public Discovery',('Explore public topics','with visible source context.'),('Enter a topic','Read public search results','See why a candidate surfaced','Open the source or dismiss'),'#b5cc18')
subprocess.run(['inkscape',str(root/'made-sick-icon.svg'),'--export-type=png','--export-filename='+str(root/'made-sick-icon.png')],check=True,capture_output=True)
icon='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="96" fill="#171a25"/><rect x="24" y="24" width="464" height="464" rx="80" fill="none" stroke="#b5cc18" stroke-width="4"/><text x="256" y="284" text-anchor="middle" fill="#b5cc18" font-family="DejaVu Sans" font-size="110" font-weight="bold">PIXIE</text></svg>'
(root/'pixie-discovery-icon.svg').write_text(icon)
subprocess.run(['inkscape',str(root/'pixie-discovery-icon.svg'),'--export-type=png','--export-filename='+str(root/'pixie-discovery-icon.png')],check=True,capture_output=True)
print('Created two 1600×900 illustrative workflow images and two square icons.')
