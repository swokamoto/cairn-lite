import express from 'express';
import { createUser, loginUser, createCharacter } from './login.js';
import { startBattle } from './battle.js';
import { homePage } from './home.js';
import { dashBoard, showInventory, showQuests, showClan } from './dashboard.js';

const router = express.Router();

router.get('/',                     (req, res) => { console.log('Rendering index view...'); res.render('index', {title: "Login"})        });

router.post('/loginUser',           (req, res) => { loginUser(req, res);        });
router.post('/createUser',          (req, res) => { createUser(req, res);       });
router.post('/createCharacter',     (req, res) => { createCharacter(req, res);  }); 
router.get('/home',                 (req, res) => { homePage(req, res);         });

router.get('/dashboard',            (req, res) => { dashBoard(req, res);        });
router.get('/dashboard/inventory',  (req, res) => { showInventory(req, res);    });
router.get('/dashboard/quests',     (req, res) => { showQuests(req, res);       });
router.get('/dashboard/clan',       (req, res) => { showClan(req, res);         });


router.get('/battle',   async   (req, res) => { startBattle(req, res);      });


export default router;
