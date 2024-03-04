const http = require('http');

function generateSSEData(data) {
    return `data: ${JSON.stringify(data)}\n\n`;
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const updates = ['4-> Wow! Its a FOUR, Straight to the boundary line', '6 -> And its a SIX! Straight out of the ground', '1-> The batsman carefully took a single', '2-> The players really moved in sync to snatch a double', '3-> That\'s some amazing running by the two', '5-> What a boundary! The team would get an extra run since it was a wide ball as well', 'Wicket -> And, the ball went straight to the fielder\'s hand'];
    const score = [4, 6, 1, 2, 3, 5, 'Wicket'];
    let runs = 0;
    let ballsBowled = 0;
    let wicketsTaken = 0;
    let runs1 = 0;
    let runs2 = 0;
    let flag = 0;
    const interval = setInterval(() => {
        if (flag == 1) {
            clearInterval(interval);
            let finalComment;
            if (runs2 > runs1) {
                finalComment = `--------Team 2 wins by ${runs2 - runs1} runs--------`;
            }
            else if (runs1 > runs2) {
                finalComment = `--------Team 1 wins by ${runs1 - runs2} runs--------`;
            }
            else {
                finalComment = `--------Match is a draw--------`;
            }
            res.write(generateSSEData({ update: finalComment }));
        }
        else if (ballsBowled == 13) {
            runs2 = runs;
            flag = 1;
            const finalScore = `--------Team2 Score: ${runs}/${wicketsTaken}--------`;
            runs = 0;
            res.write(generateSSEData({ update: finalScore }));
        }
        else if (ballsBowled == 6) {
            // team 1 has done its turn
            runs1 = runs;
            const finalScore = `--------Team1 Score: ${runs}/${wicketsTaken}--------`;
            res.write(generateSSEData({ update: finalScore }));
            runs = 0;
            wicketsTaken = 0;
            ballsBowled++;
        }
        else {
            const randomIndex = Math.floor(Math.random() * updates.length);
            const data = { update: updates[randomIndex] };
            if (updates[randomIndex].includes('Wicket')) {
                wicketsTaken++;
            }
            else if (score[randomIndex] != 5) {
                runs += score[randomIndex];
            }
            else {
                runs += score[randomIndex];
                ballsBowled--;
            }
            ballsBowled++;
            res.write(generateSSEData(data));
        }
    }, 2000);

    req.on('close', () => {
        clearInterval(interval);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
