export function PaymentCenter() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment Center</h1>
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Purchased Licenses</h2>
        <p className="text-gray-400 mb-4">You have no licenses.</p>
        <h2 className="text-xl font-semibold mb-4">Subscription Info</h2>
        <p className="text-gray-400 mb-4">No active subscriptions.</p>
        <a
          href="https://billing.stripe.com/p/login_link"
          className="inline-block px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold"
        >
          Manage Subscription
        </a>
      </div>
    </div>
  );
}
