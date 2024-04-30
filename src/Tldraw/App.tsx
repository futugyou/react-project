
import '@tldraw/tldraw/tldraw.css'

import { useCallback, useLayoutEffect, useState } from 'react'

import {
	createTLStore,
	defaultShapeUtils,
	Editor,
	Tldraw,
	throttle,
	TLUiEventHandler,
} from '@tldraw/tldraw'

import {
	CustomAssetUrls,
	UIOverrides,
	CustomeComponents,
	CustomeShapes,
	CustomTools,
} from './UiOverride/UIOverrides'

import { Hello } from './Mount/Hello'
import { Html } from './Mount/Html'
import { LocalImages } from './Mount/LocalImages'
import { Meta } from './Mount/Meta'
import { HostedImages } from './Mount/HostedImages'

import { SneakyFloatyHook } from './Hook/SneakyFloatyHook'
import { MetaUi } from './Hook/MetaUi'

const PERSISTENCE_KEY = 'tldraw_persistence_key'

const App = () => {
	const [uiEvents, setUiEvents] = useState<string[]>([])
	const handleMount = useCallback((editor: Editor) => {
		Meta(editor)
		editor.registerExternalContentHandler('text', ({ point, sources }) => Html(editor, point, sources))
		Hello(editor)
		LocalImages(editor)
		HostedImages(editor)
		editor.user.updateUserPreferences({ isSnapMode: true })
	}, [Meta, Html, Hello, LocalImages, HostedImages])

	const [store] = useState(() => createTLStore({ shapeUtils: [...defaultShapeUtils, ...CustomeShapes] }))
	const [loadingState, setLoadingState] = useState<
		{ status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
	>({
		status: 'loading',
	})

	const handleUiEvent = useCallback<TLUiEventHandler>((name, data) => {
		console.log(`${name} ${JSON.stringify(data)}`)
		setUiEvents((events) => [...events, `${name} ${JSON.stringify(data)}`])
	}, [])

	useLayoutEffect(() => {
		setLoadingState({ status: 'loading' })

		// Get persisted data from local storage
		const persistedSnapshot = localStorage.getItem(PERSISTENCE_KEY)

		if (persistedSnapshot) {
			try {
				const snapshot = JSON.parse(persistedSnapshot)
				store.loadSnapshot(snapshot)
				setLoadingState({ status: 'ready' })
			} catch (error: any) {
				setLoadingState({ status: 'error', error: error.message }) // Something went wrong
			}
		} else {
			setLoadingState({ status: 'ready' }) // Nothing persisted, continue with the empty store
		}

		// Each time the store changes, run the (debounced) persist function
		const cleanupFn = store.listen(
			throttle(() => {
				const snapshot = store.getSnapshot()
				localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot))
			}, 500)
		)

		return () => {
			cleanupFn()
		}
	}, [store])

	if (loadingState.status === 'loading') {
		return (
			<div className="tldraw__editor">
				<h2>Loading...</h2>
			</div>
		)
	}

	if (loadingState.status === 'error') {
		return (
			<div className="tldraw__editor">
				<h2>Error!</h2>
				<p>{loadingState.error}</p>
			</div>
		)
	}

	return (
		<div style={{ inset: 0 }}>
			<Tldraw
				onMount={handleMount}
				shapeUtils={CustomeShapes}
				tools={CustomTools}
				components={CustomeComponents}
				overrides={UIOverrides}
				store={store}
				assetUrls={CustomAssetUrls}
				onUiEvent={handleUiEvent}
			>
				<SneakyFloatyHook />
				<MetaUi />
			</Tldraw>
		</div>
	)
}

export default App 
