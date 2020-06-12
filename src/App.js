import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Footer from './components/Footer';
import Header from './components/Header';

import IconRemove from './assets/icon-remove.svg';
import './App.scss';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.jsonbin.io/b/5e8884988841e979d0fd84ed/5')
      .then((res) => {
        //console.log(res);
        setJobs(res.data.jobs);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClearFilters = () => {
    setFilters([]);
  };

  const jobsWithFilter = jobs.filter((job) => {
    return filters.every((filter) => job.skills.includes(filter));
  });

  return (
    <>
      <Header />
      <main className='App'>
        {filters.length > 0 && (
          <div className='filters'>
            <ul className='filters-list'>
              {filters.map((filter, index) => (
                <li key={index} className='filters-item'>
                  {filter}
                </li>
              ))}
            </ul>
            <button className='filter-clear'>Clear</button>
          </div>
        )}

        {jobsWithFilter.map((job, index) => (
          <div
            key={index}
            className={`job-offers job-offers${job.featured && `--featuded`}`}
          ></div>
        ))}
      </main>
      <Footer isLoaded={isLoaded} />
    </>
  );
};

export default App;
