import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

import { AppModule } from './${{values.serverAppName}}-home.module';

async function bootstrap() {
    const logger = new Logger('Main');
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            transports: [
                new transports.Console({
                    level: 'info',
                    format: format.combine(
                        format.cli(),
                        format.splat(),
                        format.timestamp(),
                        format.printf((info) => {
                            return `${info.timestamp} ${info.level}: ${info.message}`;
                        }),
                    ),
                }),
                new transports.File({
                    filename: 'logs/${{values.serverAppName}}-backend-error.log',
                    level: 'error',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.File({
                    filename: `logs/${{values.serverAppName}}-backend-combined.log`,
                    format: format.combine(format.timestamp(), format.json()),
                }),
            ],
        }),
    });

    const port = process.env.PORT || 3000;

    app.enableCors();

    const config = new DocumentBuilder().setTitle('App API').setDescription('The App API Documentation').setVersion('1.0').addTag('App').build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    logger.log(`env: ${process.env.NODE_ENV}`);
    logger.log(`Application Running on http://localhost:${port}`);
}

bootstrap();
