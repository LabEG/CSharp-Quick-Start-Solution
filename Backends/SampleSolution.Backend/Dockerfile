FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim

WORKDIR /app
ENV ASPNETCORE_URLS=http://0.0.0.0:32102
EXPOSE 32102

RUN ls -lah ../

RUN ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone
COPY ${source:-bin/Release/netcoreapp3.1/publish} .
ENTRYPOINT ["dotnet", "SampleSolution.Backend.dll"]
