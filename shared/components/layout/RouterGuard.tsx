import React from 'react'
import { useRouter } from 'next/router'

// import { userService } from 'services';

interface Props {
	auth?: boolean
}

const RouterGuard: React.FC<Props> = ({ children, auth }) => {
	const router = useRouter()
	const [authorized, setAuthorized] = React.useState(false)

	const authCheck = (url: string) => {
		// 로그인 되 않은 사용자에 대해 redirect 처리
		const publicPaths = ['/login']
		const path = url.split('?')[0]
		// 아래 내용은 실제로 인증 구현시 제작성 되야할 부분
		// if (!userService.userValue && !publicPaths.includes(path)) {
		setAuthorized(true)
		// router.push({
		// 	pathname: '/login',
		// 	query: { returnUrl: router.asPath },
		// })
		// } else {
		// setAuthorized(true)
		// }
	}

	React.useEffect(() => {
		// 초기 로드 시 로그인 관련 함수를 실행
		authCheck(router.asPath)

		// on route change start - authorized를 flase로 설정하여 초기 로딩을 감춘다.
		const hideContent = () => setAuthorized(false)
		router.events.on('routeChangeStart', hideContent)

		// on route change complete - route change가 긑날때 마다 authCheck 함수를 실행
		router.events.on('routeChangeComplete', authCheck)

		// 구독 해지 시 등록된 이벤트를 해지
		return () => {
			router.events.off('routeChangeStart', hideContent)
			router.events.off('routeChangeComplete', authCheck)
		}
	}, [])

	if (authorized) {
		return <>{children}</>
	} else {
		return <></>
	}
}

export default RouterGuard
