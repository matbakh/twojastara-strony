import asyncio
from playwright.async_api import async_playwright
URL='http://localhost:8766/middin/'
async def zrob(p, w, h, wyj, mobile):
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx=await b.new_context(viewport={'width':w,'height':h}, device_scale_factor=2 if mobile else 1, is_mobile=mobile, has_touch=mobile, locale='pl-PL', timezone_id='Europe/Warsaw')
    pg=await ctx.new_page()
    await pg.goto(URL, wait_until='networkidle')
    await pg.evaluate("""()=>{document.querySelector('.demo-root')?.remove(); const h=document.documentElement; h.classList.remove('tryb-pokazowy','pasek-zwiniety'); h.style.setProperty('--demo-h','0px'); document.querySelectorAll('[data-pokaz]').forEach(e=>e.classList.add('widoczny'));}""")
    try:
        await pg.wait_for_function("[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight).every(i=>i.complete)", timeout=10000)
    except Exception: pass
    await pg.wait_for_timeout(1200)
    await pg.screenshot(path=wyj, type='jpeg', quality=86)
    await b.close()
async def main():
    async with async_playwright() as p:
        await zrob(p,1440,900,'/home/claude/narzedzia/po.jpg',False)
        await zrob(p,390,844,'/home/claude/narzedzia/po-telefon-2x.jpg',True)
asyncio.run(main())
