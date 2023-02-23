import figlet from 'figlet';
import chalk from "chalk";
import logger from "./logger.mjs";


export default function logoPrint() {
    figlet("XuMi",{
        font: 'Ghost',
    }, function(err, data) {
        if (err) {
            logger.notice('Logo Generate fail, But dev work will continue~');
            return;
        }
        console.log(chalk.blueBright(data))
    })
}
