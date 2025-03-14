import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// In-memory store for Pokémon battle data
let pokemons = [
    { id: 1, name: 'Pikachu', health: 100, user: true },
    { id: 2, name: 'Charmander', health: 100, user: false },
];

// Get all Pokémon
app.get('/pokemons', (req, res) => {
    res.json(pokemons);
});

// Get Pokémon by ID
app.get('/pokemons/:id', (req, res) => {
    const pokemon = pokemons.find(p => p.id === parseInt(req.params.id));
    if (!pokemon) return res.status(404).json({ message: 'Pokémon not found' });
    res.json(pokemon);
});

// Attack endpoint (simulates a battle move)
app.post('/battle/attack', (req, res) => {
    const { attackerId, defenderId } = req.body;
    const attacker = pokemons.find(p => p.id === attackerId);
    const defender = pokemons.find(p => p.id === defenderId);

    if (!attacker || !defender) return res.status(404).json({ message: 'Pokémon not found' });

    // Simple battle logic: attacker deals 10 damage, receives 5 damage
    defender.health = Math.max(defender.health - 10, 0);
    attacker.health = Math.max(attacker.health - 5, 0);

    res.json({ message: 'Attack executed', attacker, defender });
});

// Start the server  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});