export const printImage = (src: string): void => {
  const win = window.open(src, '_blank')
  if (!win) return

  win.document.open()
  win.document.write(
    `<html lang="en">
      <head><title></title></head>
      <body onload="window.print()" onafterprint="window.close()">
        <img src="${src}" alt=""/>
      </body>
    </html>`,
  )
  win.document.close()
}
