import { WarningMessageEmbed } from '@/embeds';
import { getMessage, logger, keyv } from '@/utils';
import { Message } from 'discord.js';

export default {
    name: 'init-exam-channel',
    guildOnly: true,
    cooldown: 0,
    permissions: [ 'ADMINISTRATOR' ],
    execute( message: Message ) {
        const channelId = Number.parseInt( message.content );

        function isInvalid() {
            return !channelId || !message.guild?.channels.cache.has( channelId.toString() );
        }

        if ( isInvalid() ) {
            message.reply( 
                new WarningMessageEmbed(
                    {
                        description: getMessage( 'command.exams.invalid' ) + message.content
                    }
                )
             )
            logger.warn( `Invalid Channel ID: "${message.content}" provided` );
            return;
        }
        const key = keyv( 'exams' );
        key.set( 'channel_id', channelId );
        logger.info( `New Exam Channel ID: "${channelId}" have been persisted` );
    }
}