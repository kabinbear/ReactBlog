import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Row, Col, List } from 'antd'
import Header from '../components/Headers'
import { createFromIconfontCN } from '@ant-design/icons';
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';


function Home(list) {
  const [mylist, setmylist] = useState(list.data
  )
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2146321_6yg1gzigj6u.js',
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
    <div className={styles.container}>
      <Head>
        <title>欢迎来到3T的博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><IconFont type="icon-good" />{item.addTime}</span>
                  <span><IconFont type="icon-fabulous" /> {item.typeName}</span>
                  <span><IconFont type="icon-more" />{item.view_count}人</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        console.log('远程获取数据结果:', res.data)
        resolve(res.data)
      }
    )
  }
  )
  return await promise
}
export default Home