module.exports = app => {
  app.get('/', (req, res) => res.status(200).render('indexView', { title: 'Mike Pearce' }));
  app.get('/aqi', (req, res) => res.status(200).render('aqiView', { title: 'Castro Neighborhood AQI'}));
};
