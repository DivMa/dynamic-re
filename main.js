function writeCss(prefix, word, fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domCode.innerHTML = Prism.highlight(prefix + word.substring(0, n), Prism.languages.css);
      styleTag.innerHTML = prefix +  word.substring(0, n)
      domCode.scrollTop = domCode.scrollHeight
      if (n >= word.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 70)
  }
  function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domPaper.innerHTML = markdown.substring(0, n)
      domPaper.scrollTop = domPaper.scrollHeight
      if (n >= markdown.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 30)
  }
  
  var css1 = `/* 
   * 面试官你好，我是chil
   * 只用文字作做我介绍太单调了
   * 我就用代码来介绍吧
   * 首先准备一些样式
   */
  *{
    transition: all 1s;
  }
  html{
    background: #fee8de;
  }
  #code{
    border: 1px solid #aaa;
    padding: 16px;
  }
  /* 我需要一点代码高亮 */
  .token.selector{ color: #690; }
  .token.property{ color: #905; }
  /* 加一个呼吸效果 */
  #code{
    animation: breath 0.5s infinite alternate-reverse;
  }
  /* 然而这些并没什么用。。 */
  /* 简历其实在右边啦 */
  /* 简历首先需要一张白纸 */
  #code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
  }
  #paper > .content {
   display: block;
  }
  /* 于是可以在白纸上写字啦，请看~ */
  `
  
  var css2 = `
  /* 接下来用一个优秀的库 marked.js
   * 把 Markdown 变成 HTML
   */
  `
  var md = `
  # 自我介绍
  我叫 邱婉琳
  1997 年 1 月出生
  中北大学 电子相关专业毕业
  自学前端半年
  希望应聘前端开发岗位
  # 技能介绍
  熟悉 JavaScript CSS
  # 项目介绍
  1. XXX 轮播
  2. XXX 简历
  3. XXX 画板
  # 联系方式
  - QQ xxxxxxxx
  - Email xxxxxxxx
  - 手机 xxxxxxx
  # 联系方式
  - QQ xxxxxxxx
  - Email xxxxxxxx
  - 手机 xxxxxxx
  # 联系方式
  - QQ xxxxxxxx
  - Email xxxxxxxx
  - 手机 xxxxxxx
  `
  let css3 = `
  /*
   * 这就是我的动态简历
   * 谢谢观看~~
   */
  `
  
  writeCss('', css1, ()=>{ 
    createPaper(() => {
      writeMarkdown(md, ()=> {
        writeCss(css1, css2, ()=>{
          convertMarkdownToHtml(()=>{
            writeCss(css1 + css2, css3, ()=> {
              console.log('完成')
            })
          })
        })
      })
    })
  })
  
  
  
  
  function createPaper(fn){
    var paper = document.createElement('div') 
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
  }
  
  function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
  }