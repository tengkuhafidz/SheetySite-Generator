import React from 'react'

interface Props {
  handleEmailChange: (e) => void
  handleSiteGeneration: () => void
  invalidEmailErrMsg: string
  isLoading: boolean
}

const RequestEmailForm: React.FC<Props> = ({
  handleEmailChange,
  handleSiteGeneration,
  invalidEmailErrMsg,
  isLoading,
}) => (
  <div className="text-center">
    <span className="text-6xl">💌</span>
    <h1 className="font-bold text-3xl">Final Step! Please provide your email.</h1>
    <div className="mb-6">
      <label className="block text-gray-700 text-lg  mb-6 max-w-lg mx-auto" htmlFor="email">
        As WebSheets is an evolving project, we need a way to reach out to you whenever there is any major updates to
        the system.
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Email"
        onChange={(e) => handleEmailChange(e)}
      />
      <p className="text-red-500 text-xs text-left">{invalidEmailErrMsg}</p>
      <button
        className={`text-white text-xl font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline mt-8 border-b-4 border-blue-800 ${
          isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 '
        }`}
        type="button"
        onClick={handleSiteGeneration}
      >
        {isLoading ? 'Loading...' : 'Generate My Site'}
      </button>
    </div>
  </div>
)

export default RequestEmailForm
