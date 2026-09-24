import {SceneProvider} from './context/SceneContext'
import Experience from './components/canvas/Experience'
import NavigationUI from './components/ui/NavigationUI'
import PaperTransition from './components/dom/PaperTransition'
function AppInner(){return <div id="top" className="app-shell"><div className="canvas-shell"><Experience/></div><NavigationUI/><PaperTransition/><div className="entrance-hint">CLICK THE DOORS<span>↓</span></div></div>}
export default function App(){return <SceneProvider><AppInner/></SceneProvider>}