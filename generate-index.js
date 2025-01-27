const { readdirSync, writeFileSync } = require('fs');
const { join } = require('path');

function generateCommandAndEventIndex() {
    const commandDir = join(process.cwd(), 'src', 'commands');
    const eventDir = join(process.cwd(), 'src', 'events');

    const commandFiles = readdirSync(commandDir).filter(file => file.endsWith('.ts'));
    const eventFiles = readdirSync(eventDir).filter(file => file.endsWith('.ts'));

    let output = '';

    // Generate imports for commands
    commandFiles.forEach(file => {
        const commandName = file.replace('.ts', '');
        output += `import { command as ${commandName} } from './commands/${commandName}';\n`;
    });

    // Generate imports for events
    eventFiles.forEach(file => {
        const eventName = file.replace('.ts', '');
        output += `import { event as ${eventName} } from './events/${eventName}';\n`;
    });

    // Export all commands and events
    output += '\nexport const commandsPre = {\n';
    commandFiles.forEach(file => {
        const commandName = file.replace('.ts', '');
        output += `  '${commandName}': ${commandName},\n`;
    });
    output += '};\n';

    output += '\nexport const eventsPre = {\n';
    eventFiles.forEach(file => {
        const eventName = file.replace('.ts', '');
        output += `  '${eventName}': ${eventName},\n`;
    });
    output += '};\n';

    // Write to a prebuilt file
    const outputPath = join(process.cwd(), 'src', 'prebuilt-index.ts');
    writeFileSync(outputPath, output);
    console.log('Prebuilt index file generated.');
}

generateCommandAndEventIndex();