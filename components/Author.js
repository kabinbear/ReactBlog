import { Avatar, Divider } from 'antd'
import '../styles/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={{ xs: 24, sm: 70, md: 80, lg: 80, xl: 80, xxl: 100 }} src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=354093dea2c9d09030cc81773f9fe4d2&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fb03533fa828ba61eb15677cb4f34970a314e599d.jpg"></Avatar></div>
            <div className="author-introduction">软件工程大四在读，专注Web前端技术，保持进步🚀</div>
            <Divider>社交账号</Divider>
            <Avatar size={38} icon={<GithubOutlined />} className="account" />
            <Avatar size={38} icon={<QqOutlined />} className="account" />
            <Avatar size={38} icon={<WechatOutlined />} className="account" />
        </div>
    )
}


export default Author