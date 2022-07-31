import { cl } from './cl';

function App() {
  return (
    <div className={cl('!bg.color.grey','font.size.22px','bg.color.black')}>
      🧐
      <p className={cl('color.pink','font.size.14px')}>
        first demo
      </p>
    </div>
  )
}

export default App
