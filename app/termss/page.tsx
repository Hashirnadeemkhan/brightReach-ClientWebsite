const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <div className="w-24 h-1 bg-gradientStart mx-auto"></div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700">
            This is the terms and conditions page. Content will be added here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;