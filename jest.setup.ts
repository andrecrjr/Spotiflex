import '@testing-library/jest-dom';
import { setConfig } from 'next/config';
import config from './next.config';
import fetchMock from 'jest-fetch-mock';

// Make sure you can use "publicRuntimeConfig" within tests.
fetchMock.enableMocks();

setConfig(config);
