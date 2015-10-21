---
layout: post
title: "用 PlantUML 寫軟件文檔"
---

> 程序員最煩兩件事：給自己的程序寫文檔，以及別人的程序沒有文檔。

程序員也喜歡用代碼讓痛苦的事情變得簡單。比如用 [PlantUML](http://plantuml.com) 和 LaTeX 寫文檔。

以下是一個示例文檔工程的目錄結構。

```
├ src
│ ├ bar.pu
│ ├ foo.pu
│ └ main.tex
├ uml
│ ├ bar.png
│ └ foo.png
├ main.pdf
└ Makefile
```

其中 `src/main.tex` 是主文件；`bar.pu` 和 `foo.pu` 是 PlantUML 源代碼。`uml` 目錄中的文件是由 PlantUML 生成的圖片，默認爲 PNG 格式，也可以用 PDF 和 EPS 等矢量圖格式，取決於你用的是 LaTeX 還是 PDFLaTeX。

```makefile
# Makefile
pu=$(notdir $(wildcard src/*.pu))
png=$(patsubst %.pu,%.png,$(pu))

.PHONY: all
all: $(addprefix uml/, $(png)) main.pdf

main.pdf: src/main.tex
  xelatex src/main.tex

uml/%.png: src/%.pu
  plantuml -o uml $^
```
