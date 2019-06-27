function setHeaders(req, res) {
  res.set('Content-Security-Policy', 'default-src \'self\'; script-src \'self\' www.google-analytics.com; img-src \'self\'; style-src \'self\' fonts.googleapis.com; font-src fonts.gstatic.com; frame-src \'none\'; connect-src \'self\'; object-src \'none\'');
  res.set('Feature-Policy', 'geolocation \'none\'; midi \'none\'; sync-xhr \'none\'; microphone \'none\'; camera \'none\'; magnetometer \'none\'; gyroscope \'none\'; speaker \'none\';');
  res.set('Referrer-Policy', 'no-referrer-when-downgrade');
}

module.exports = app => {
  app.get('/', (req, res) => {
    setHeaders(req, res);
    res.status(200).render('indexView', { title: 'Mike \'Roy\' Pearce' });
  });
  app.get('/aqi', (req, res) => {
    setHeaders(req, res);
    res.status(200).render('aqiView', { title: 'Castro Neighborhood AQI'});
  });
};
