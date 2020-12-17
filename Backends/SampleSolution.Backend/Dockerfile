FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim

WORKDIR /app
ENV ASPNETCORE_URLS=http://0.0.0.0:32102
EXPOSE 32102

RUN ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone
COPY ${source:-bin/Release/netcoreapp5.0/publish} .
ENTRYPOINT ["dotnet", "SampleSolution.Backend.dll"]
