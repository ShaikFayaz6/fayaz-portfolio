# Build from repository root: docker build -f backend/Portfolio.Api/Dockerfile .
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY nuget.config ./nuget.config
COPY backend/Portfolio.Api/Portfolio.Api.csproj backend/Portfolio.Api/
RUN dotnet restore backend/Portfolio.Api/Portfolio.Api.csproj --configfile nuget.config
COPY backend/Portfolio.Api/ backend/Portfolio.Api/
RUN dotnet publish backend/Portfolio.Api/Portfolio.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080
ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
