"parse"

with open('eu.txt') as f:
    text = f.read()
    [gdp, pop, _] = text.split('\n')


def parse(gdpText=gdp, popText=pop):
    gdpList = gdpText.split('\t')
    popList = popText.split('\t')
    yearList = range(2015, 2020)
    for (gdp,  pop, year) in zip(gdpList, popList, yearList):
        print('### Year')
        print('- name: ' + str(year))
        print('- gdp: $' + str(gdp) + '$')
        print('- pop: $' + str(pop) + '$')
        print('')

parse()
