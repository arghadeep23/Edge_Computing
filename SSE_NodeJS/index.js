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
    let index = 0;

    const interval = setInterval(() => {
        if (ballsBowled >= 12 || wicketsTaken >= 10) {
            clearInterval(interval);
            const finalScore = `Final Score: ${runs}/${wicketsTaken}`;
            res.write(generateSSEData({ update: finalScore }));
        } else {
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
