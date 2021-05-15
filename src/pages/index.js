import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import CountriesTable from '../components/countries-table';
import Layout from '../components/layout';
import SearchInput from '../components/search-input';

import styles from '../styles/home.module.css'

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState('');

  const filteredCountries =
    countries.filter(country =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
    );

  const onInputChange = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries
    }
  };
 };