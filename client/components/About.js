import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
	node: {
		margin: '0 auto',
		padding: 20,
		paddingBottom: 40,
		marginTop: 10,
		maxWidth: 960,
		minWidth: 320
	},
  headline: {
    fontSize: 16,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 'bold',
  },
}

class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Paper zDepth={1} style={styles.node}>
        <div className="about_info">
          <Avatar
            src="https://avatars1.githubusercontent.com/u/1891924?v=3&s=460"
            size={100}
          />
        </div>
				<Tabs>
					<Tab label="个人介绍" >
						<div style={{textAlign: 'center'}}>
							<p><strong>姓名：</strong>徐冲</p>
							<p><strong>性别：</strong>男</p>
							<p><strong>学历：</strong>本科</p>
							<p><strong>联系方式：</strong>15501183569 </p>
							<p><strong>Email：</strong><a href="mailto:golovesx@gmail.com">golovesx@gmail.com</a></p>
							<p>
								从2012年毕业一直到现在，一直从事着web开发, 是一名ruby开发者
							</p>
						</div>
					</Tab>
					<Tab label="技术栈" >
						<div style={{textAlign: 'center'}}>
							<p>4 年 ruby on Rails 开发</p>
							<p>存储技术有 MySQL、redis、mongodb、postgresql</p>
							<p>熟悉 html、css、scss、javascript、coffeescript 以及前端 react</p>
							<p>版本控制 Git</p>
						</div>
					</Tab>
					<Tab
						label="项目经验"
					>
						<div style={{textAlign: 'center'}}>
							<h4 style={styles.headline}>1、网页数据抓取</h4>
							<p>通过写爬虫获取网页中的数据，并且分类整合，保存数据库。</p>
							<p>用到的gem有nokogiri、httpclient、mechanize等等。</p>
							<p>数据存储用的MySQL、mongodb</p>
							<h4 style={styles.headline}>2、罗盘微信（网页和手机端）</h4>
							<p>当时我们应该算是很早开发微信的一个企业。</p>
							<p>我主要负责获取并保存用户信息，当时还没有获取用户信息的接口，</p>
							<p>只能得到用户的openid，在微信网页中可以看到fakeid和用户信息。</p>
							<p>只能返回一个字符串来绑定openid和fakeid。</p>
							<p>还做了单图文、多图文回复，房产、汽车、投票等等小功能，</p>
							<p><strong>sphinx</strong>用来搜索用户，查找离用户最近的门店等，</p>
							<p><strong>redis</strong>用来记录投票数，浏览数等。</p>
							<h4 style={styles.headline}>3、梧桐社区（网页和手机端）</h4>
							<p>这个项目我主要负责给手机端封装接口，</p>
							<p>后端功能开发，微信的接入（获取用户信息，授权登陆，回复用户等），</p>
							<p>并且用开源软件spree搭建了一个电商平台，</p>
							<p>以及写一些手机端的样式。</p>
							<h4 style={styles.headline}>4、家装（网页）</h4>
							<p>用户先下单，公司人员去测量，</p>
							<p>出设计图，和用户确认，然后用户交定金签合同，</p>
							<p>去物业办理手续，原料进厂开始施工。</p>
							<p>一些施工细节，用户都可以通过登陆查看，</p>
							<p>我主要负责后端开发，以及写一些样式。</p>
						</div>
					</Tab>
				</Tabs>
      </Paper>
    )
  }
}

export default About;
