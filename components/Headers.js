import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import { BankOutlined } from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons';


const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart 
        '//at.alicdn.com/t/font_2146321_6yg1gzigj6u.js'
    ],
});
// const [navArray, setnavArray] = useState([])

const Header = () => {
    const [NavArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
            console.log(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }


    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo"><Link href={{ pathname: '/' }}>
                        <a>kabinbear</a>
                    </Link></span>
                    <span className="header-txt">专注前端开发，努力成长为独当一面的FN</span>
                </Col>
                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <BankOutlined />
                           博客首页
                     </Menu.Item>
                        {
                            NavArray.map((item) => {
                                return (console.log(item),
                                    <Menu.Item key={item.id}>
                                        <IconFont type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }

                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header