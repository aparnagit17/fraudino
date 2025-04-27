export function StatsSection() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The Counterfeit Crisis
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Counterfeit goods represent a $1.8 trillion global problem, affecting consumers and businesses alike.
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-col">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Annual global losses
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-primary">
              $1.8T
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Of online shoppers affected
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-primary">
              26%
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Average detection accuracy
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-green-500">
              97%
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
