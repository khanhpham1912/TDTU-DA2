import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("WMS-demo")
    .setDescription("The WMS API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const origin = process.env.CLIENT_ORIGINS?.split(",").map((v: string) =>
    v.trim()
  );

  app.enableCors({ origin: origin, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(process.env.PORT);
}
bootstrap();
