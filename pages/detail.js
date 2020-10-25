
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { useState } from 'react'
import Header from '../components/Headers'
import Author from '../components/Author'
// import Advert from '../components/Advert'
import Footer from '../components/Footer'
// import ReactMarkdown from 'react-markdown'
import '../styles/pages/detail.css'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import Axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import { createFromIconfontCN } from '@ant-design/icons';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

function Detailed(content) {
  const tocify = new Tocify
  const [mycontent, setmycontent] = useState(content.data)
  const renderer = new marked.Renderer();
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2146321_6yg1gzigj6u.js',
  })
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(content.article_content)

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>

              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {content.title}
              </div>

              <div className="list-icon center">
                <span><IconFont type="icon-good" /> {content.addTime}</span>
                <span><IconFont type="icon-remen" />{content.typeName}</span>
                <span><IconFont type="icon-yanjing" />{content.view_count} 人</span>
              </div>

              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>

              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={5}>
            <div className="detail-nav comm-box"><div className="nav-title">文章目录</div><div className="toc-list">
              {tocify && tocify.render()}
            </div></div>
          </Affix>

        </Col>
      </Row>
      <Footer />

    </>
  )
}
Detailed.getInitialProps = async (context) => {

  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {

    Axios(servicePath.getArticleById + id).then(
      (res) => {
        console.log(res)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
export default Detailed