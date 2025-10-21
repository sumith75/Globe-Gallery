const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

const PEXELS_KEY = "31B3nDoIxG88ckvIRkFQpntzSyTyUVpwmnJANgaTYqZOMhnp5i8lRU10";
const UNSPLASH_KEY = "1itJWACJZLyGlteBsTe1gDI__vqg7YnzWG2Cjzd0ZLE";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('idx1');
});

app.get('/api/country-info', async (req, res) => {
    const country = req.query.name;
    const apiUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.length > 0) {
            res.json(data[0]);
        } else {
            res.status(404).json({ error: 'Country not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Country not found or API error.' });
    }
});

app.get('/culture', (req, res) => {
    // Example: get country from query string
    const country = req.query.country || "culture";
    res.render('culture', { country });
});
app.get('/tourist', (req, res) => {
    const country = req.query.country || "";
    res.render('tourist', { country });
});
app.get('/food', (req, res) => {
    const country = req.query.country || "";
    res.render('food', { country });
});
    
app.get('/people', (req, res) => {
    const country = req.query.country || "";
    res.render('people', { country });
});

// Culture images from Unsplash
app.get('/api/culture-images', async (req, res) => {
    const country = req.query.country || "culture";
    const page = Math.floor(Math.random() * 50) + 1;
    const perPage = 10;
    const query = `${country} culture`;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&per_page=${perPage}&page=${page}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const images = (data.results || []).map(photo => ({
            url: photo.urls.regular,
            alt: photo.alt_description || "Culture photo"
        }));
        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch culture images." });
    }
});

// Tourist images from Pexels
app.get('/api/tourist-images', async (req, res) => {
    const country = req.query.country || "tourist places";
    const page =Math.floor(Math.random() * 50) + 1;
    const perPage = req.query.perPage || 10;
    const query = `${country} tourist places`;
    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    try {
        const response = await fetch(apiUrl, {
            headers: { Authorization: PEXELS_KEY }
        });
        const data = await response.json();
        const images = (data.photos || []).map(photo => ({
            url: photo.src.large,
            alt: photo.alt || "Tourist photo"
        }));
        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tourist images." });
    }
});

// Food images from Unsplash
app.get('/api/food-images', async (req, res) => {
    const country = req.query.country || "food";
    const page = Math.floor(Math.random() * 50) + 1;
    const perPage = req.query.perPage || 10;
    const query = `${country} food`;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&per_page=${perPage}&page=${page}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const images = (data.results || []).map(photo => ({
            url: photo.urls.regular,
            alt: photo.alt_description || "Food photo"
        }));
        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch food images." });
    }
});

// People images from Pexels
app.get('/api/people-images', async (req, res) => {
    const PEXELS_KEY = "31B3nDoIxG88ckvIRkFQpntzSyTyUVpwmnJANgaTYqZOMhnp5i8lRU10";
    const country = req.query.country || "people";
    const page = Math.floor(Math.random() * 50) + 1;
    const perPage = req.query.perPage || 10;
    const query = `${country} people`;
    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    try {
        const response = await fetch(apiUrl, {
            headers: { Authorization: PEXELS_KEY }
        });
        const data = await response.json();
        const images = (data.photos || []).map(photo => ({
            url: photo.src.large,
            alt: photo.alt || "People photo"
        }));
        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch people images." });
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(5500, () => {
    console.log('Server running on http://localhost:5500');
});
