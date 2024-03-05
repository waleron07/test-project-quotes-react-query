import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App/App';
import Application from '@/pages/application';
import Quotes from '@/pages/quotes';
import QuotesMob from '@/pages/quotesMobix';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={'loading...'}>
            <Application />
          </Suspense>
        ),
      },
      {
        path: '/quotes-react-query',
        element: (
          <Suspense fallback={'loading...'}>
            <Quotes />
          </Suspense>
        ),
      },
      {
        path: '/quotes-mobix',
        element: (
          <Suspense fallback={'loading...'}>
            <QuotesMob />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
