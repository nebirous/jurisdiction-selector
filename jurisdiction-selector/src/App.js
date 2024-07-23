import JurisdictionSelector from './components/JurisdictionSelector';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-left text-3xl font-extrabold text-white">
            Jurisdiction Selector
          </h1>
          <p className="mt-2 text-left text-sm text-gray-400">
            Select your jurisdictions and sub-jurisdictions below
          </p>
        </div>
        <div className="bg-white h-fit items-center shadow-md rounded-lg p-6">
          <JurisdictionSelector />
        </div>
      </div>
    </div>
  );
}

export default App;
