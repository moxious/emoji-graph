import { Link, routes } from '@redwoodjs/router'

const EmojisLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <div className="bg-white font-sans">
        <header className="flex justify-between py-4 px-8">
          <h1 className="text-xl font-semibold">
            <Link
              to={routes.emojis()}
              className="text-gray-700 hover:text-gray-900 hover:underline"
            >
              Emojis
            </Link>
          </h1>
          <Link
            to={routes.newEmoji()}
            className="flex bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wide rounded"
          >
            <div className="text-xl leading-none">+</div>
            <div className="ml-1 leading-loose">New Emoji</div>
          </Link>
        </header>
        <main className="mx-4 pb-4">{props.children}</main>
      </div>
    </div>
  )
}

export default EmojisLayout
