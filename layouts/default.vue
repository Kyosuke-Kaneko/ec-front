<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'
export default {//フッターを呼び出している
  components: {
    Footer,
    Header
  }
}
</script>

<style>
/*
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com
Twitter: @rich_clark
*/

html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    font-weight: normal;
}
body {
    line-height:1;
}
article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
    display:block;
}
nav ul {
    list-style:none;
}
blockquote, q {
    quotes:none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}
a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}
/* change colours to suit your needs */
ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}
/* change colours to suit your needs */
mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
}
del {
    text-decoration: line-through;
}
abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
}
table {
    border-collapse:collapse;
    border-spacing:0;
}
/* change border colour to suit your needs */
hr {
    display:block;
    height:1px;
    border:0;  
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}
input, select {
    vertical-align:middle;
}
.pagination-box {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }
.pagination-btn__link,
.pagination-item__link {
  border: solid 2px #80A31D;
  border-radius: 20px;
  text-align: center;
  padding: 4px 0;
  margin: 0 .25rem;
  display: block;
  width: 50px;
}
.pagination-btn__link:hover,
.pagination-item__link:hover {
  background-color: #80A31D;
  color: #fff;
}
.active .pagination-item__link {
  list-style: none;
  background-color: #80A31D;
  color: #fff;
  pointer-events: none;
}
.pagination-next, .pagination-prev {
  font-size: 13px;
  font-weight: bold;
}
li {
  list-style-type:none;
}
button  a {
  cursor: pointer;
}
</style>
