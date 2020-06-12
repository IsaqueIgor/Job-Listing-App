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

  const handleAddFilters = (e) => {
    const updateFilters = [...filters];
    if (updateFilters.indexOf(e.target.value) === -1) {
      updateFilters.push(e.target.value);
    }
    setFilters(updateFilters);
  };

  const handleRemoveFilter = (e) => {
    //console.log(e.currentTarget.value);
    const updateFilters = [...filters];
    const filtersAfterDelete = updateFilters.filter(
      (item) => item !== e.currentTarget.value
    );
    setFilters(filtersAfterDelete);
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
            <ul className='filters__list'>
              {filters.map((filter, index) => (
                <li key={index} className='filters__item'>
                  {filter}
                  <button
                    value={filter}
                    className='filters__item-remove'
                    onClick={handleRemoveFilter}
                  >
                    <img
                      className='filters__remove-img'
                      src={IconRemove}
                      alt='removeicon'
                    />
                  </button>
                </li>
              ))}
            </ul>
            <button className='filters__clear' onClick={handleClearFilters}>
              Clear
            </button>
          </div>
        )}

        {jobsWithFilter.map((job, index) => (
          <div
            key={index}
            className={`job-offers job-offers${job.featured && `--featured`}`}
          >
            <div className='job-offers__info'>
              <figcaption className='job-offers__offer'>
                <img
                  className='job-offers__offer-img'
                  src={require(`./assets/${job.companyImg}`)}
                  alt='companyPhoto'
                />
                <div className='job-offers__offer-info'>
                  <div className='job-offers__first-info'>
                    <p className='job-offers__company'>{job.company}</p>
                    {job.status.map((status, index) => (
                      <p key={index} className={`job-offers__${status}`}>
                        {status}
                      </p>
                    ))}
                  </div>
                  <div className='job-offers__second-info'>
                    <h2 className='job-offers__job-name'>{job.jobName}</h2>
                  </div>
                  <div className='job-offers__third-info'>
                    <p className='job-offers__when-add'>{job.whenAdd}</p>
                    <p className='job-offers__time'>{job.jobTime}</p>
                    <p className='job-offers__where'>{job.place}</p>
                  </div>
                </div>
              </figcaption>
            </div>
            <div className='job-offers__skills'>
              <ul className='job-offers__skills-list'>
                {job.skills.map((skill, index) => (
                  <li key={index} className='job-offers__skills-item'>
                    <button
                      value={skill}
                      className='job-offers__skills-btn'
                      onClick={handleAddFilters}
                    >
                      {skill}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
      <Footer isLoaded={isLoaded} />
    </>
  );
};

export default App;
