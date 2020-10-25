import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from '../components/Headers'
import Author from '../components/Author'
import { createFromIconfontCN } from '@ant-design/icons';
import Footer from '../components/Footer'
import '../styles/pages/list.css'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import Axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';


const ArticleList = (list) => {
  const Icon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2146321_6yg1gzigj6u.js',
  })
  const [mylist, setMylist] = useState(list.data);

  useEffect(() => {
    setMylist(list.data)
  })
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });

  return (
    <>
      <Head>
        <title>Home</title>
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

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                      {item.title}
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="icon-yanjing" />{item.addTime}</span>
                    <span><Icon type="icon-more" /> {item.typeName}</span>
                    <span><Icon type="icon-remen" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            />

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />

    </>
  )
}
ArticleList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    Axios(servicePath.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise
}
export default ArticleList
