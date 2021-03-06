import type { FC } from 'react'
import { Layout } from 'antd'
import GlobalStyle from '@styles/global'
import { Sidebar, AppHeader, AppFooter } from '@components/layout'

const { Sider, Content } = Layout

interface Props {}

export const AppLayout: FC<Props> = (props) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<GlobalStyle />
			<AppHeader />
			<Layout>
				<Sider width="auto" style={{ backgroundColor: '#fff' }}>
					<Sidebar />
				</Sider>
				<Layout>
					<Content style={{ padding: '50px' }}>
						{props.children}
					</Content>
					<AppFooter />
				</Layout>
			</Layout>
		</Layout>
	)
}
