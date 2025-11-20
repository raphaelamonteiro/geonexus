// backend/src/test-api.ts
import { restcountriesService } from './services/restcountries.service';

async function testRestCountriesAPI() {
    try {
        console.log('🧪 Testando conexão com RestCountries API...');

        // Teste 1: Buscar países usando o endpoint correto
        console.log('\n1. Testando busca de países (endpoint correto)...');
        const countries = await restcountriesService.getAllCountries();
        console.log(`✅ ${countries.length} países encontrados`);

        // Mostrar alguns países como exemplo
        console.log('\n📋 Exemplos de países encontrados:');
        countries.slice(0, 5).forEach((country, index) => {
            console.log(`   ${index + 1}. ${country.name.common} (${country.cca2})`);
        });

        // Teste 2: Buscar um país específico
        console.log('\n2. Testando busca por código BR...');
        const country = await restcountriesService.getCountryByCode('BR');
        console.log('✅ País encontrado:', country[0]?.name.common);

        // Teste 3: Buscar países de uma região
        console.log('\n3. Testando busca por região Americas...');
        const regionCountries = await restcountriesService.getCountriesByRegion('Americas');
        console.log(`✅ ${regionCountries.length} países na região Americas`);

        console.log('\n🎉 Todas as chamadas da API funcionaram!');

    } catch (error: any) {
        console.error('\n❌ Erro no teste da API:', error.message);
    }
}

testRestCountriesAPI();