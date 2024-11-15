# Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /usr/src/app

COPY ./backend-secuill.csproj ./usr/src/app
RUN dotnet restore

COPY ./backend-secuill ./usr/src/app
RUN dotnet publish -c Release -o /usr/src/app/publish

# Run
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /usr/src/app
EXPOSE 80
COPY --from=build-env /usr/src/app/publish .
ENTRYPOINT [ "dotnet", "backend-secuill.dll" ]
