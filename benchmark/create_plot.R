library(ggplot2)

data = read.csv("./result.csv")

p1 = ggplot(dat = data[data$language == 'js',]) + geom_boxplot(aes(x = schema, y = time))
p2 = ggplot(dat = data) + geom_boxplot(aes(x = schema, y = time, color = language))
p3 = ggplot(dat = data) + geom_boxplot(aes(x = schema, y = log(time), color = language))
