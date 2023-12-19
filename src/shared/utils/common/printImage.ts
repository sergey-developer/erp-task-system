export const printImage = (src: string): void => {
  const win = window.open(src, '_blank')
  win!.document.open()
  win!.document.write(
    `<html>
      <head><title></title></head>
      <body onload="window.print()" onafterprint="window.close()">
        <img src="${src}" alt=""/>
      </body>
    </html>`,
  )
  win!.document.close()
}
