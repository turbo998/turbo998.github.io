(function () {
  "use strict";

  const PAGE_LANG = (document.documentElement.getAttribute("lang") || "zh-CN").toLowerCase().startsWith("en") ? "en" : "zh";
  let lang = PAGE_LANG;

  const STORAGE_KEY = "gtr_diamond_live_gate_v1";
  const TTL_MS = 30 * 24 * 60 * 60 * 1000;

  const DRAWIO_URLS = {
    arch1: "https://app.diagrams.net/?title=Travel-Retail-01-AI-Business-Operations-Architecture.drawio#R7V3bcts4Ev0aVtkPcZHgDXwEKTKTHXuSjTM7jypGYmxuZFFLUXayX7%2FVjQtBApIdx7aYWVelUjLFCwgcNLpPH7QcP7v59rYtN9cXzbJaOcRdfnP8mUOIFxLXIQSOfOdHEnngqq2X4qT%2BwGX930oclKft6mW1HZzYNc2qqzfDg4tmva4W3eBY2bbN3fC0L81q%2BNRNeVUZBy4X5co8%2Ble97K7F0Thy%2By9%2Bq%2Bqra%2FloNxDf3JTybHFge10umzvtkJ87LnPgs%2FznZ23TdJYv5Nc337JqBT0sO4%2Ffu%2FiRS9QrtdW6e%2FRd1oTf5rZc7URfOXnoJKmTzpw8cZLEoaGTR04S4wfqMM%2BhGX6VOmmEJwcOy508cFLqJAyOUAan5dRJCydx4UPiOiyENmTESWP4ABcWTsrwQubQ3CEu%2B%2B%2BurRzizsqu%2FNzWi69bPDOG29IATniHByJoF1xKHepjS0OHRk7qw7ls5iSRaA7NsaV4MI%2FhT1ZY2gU3zPFt8AM8KnKI%2F610%2FBSO0cRJfLgTdfENffyAN0hjh1F4PiPQFr2n0gAfqxoSwnGKDWGqaaNOjOEl0hQ%2FpNBBMHKp6C8a4rNieDQ8Cx%2BRhvj03EnxchY4aaYdwacz7KG0wKt44z08wpwkFB8YjMobh0RXHbw1cf9c1913h7hZ2ZWr5grbQKH%2FxEsl0C155KRENBhahe%2BSeg4lo7vByBXpOzmemUOxZ5MZNEu%2B5NtqXVfiZVkBj%2BBPTGZyGHO8KHRSV13ErmACEDftARM6tECUmkAJ4H8%2BmCNY8NndfZc2o21262UF88Rz%2FPTuuu6qy025gG%2Fv2nLj%2BOl1d7MSX3%2BpV6usWTUtXuu7hRcT5vjptmubr5X2jZeTxE%2FhimbdaccLWrAic%2Fy0XNVXa8efraov0HXbTbmo11fn%2BNfMo46f3lZtVy%2FKFRNn3tTLJTQabylsrxfKv8ULQSOV6fJwTHDeV21XfdtrUTxh4HBpqJqbqmsBEuICX5hEsShIC3mnW1hXHLzWrGskjE4prPqVurM0X37mkEIYqx%2BxZr5hzbwzaTH2Tcs9c2ZgySKcKq6TF3AmpQgffiSGmUNxOtFETO90hkilYElST0CWFvLy5Oewtiy31%2Bpc%2BOND2XVVC1CIHOIGJhwLt0iKwgZHl9Agi9U3cnH0zkIL0Lpmcy9ASX%2FoE5w%2BoxYg6kAl5lxQjXp6jHquCVLfs2A0lg7A04M0MEBKzvYvfhGYQbGgpWi5JHKJ%2B2cmTzFt8Mi0vzjgZoXV%2FrlFHEX51AAnG%2FUUgIvvR1wQviziQgNx%2FplYibmXITDlDtZHxnANles5N14J01fyxGEJmkz%2BIUKbR%2BGCxy3pL4vSPC%2BI3SwGRRDl4cRQqhr1BCil4QNQGrwsSiMDpQFHKYIT7Btfj6lwyVmsxSMGSk2v0Or2v4x7%2BAgLWhRpntqwmQah7yYTw6Zq1BNg0%2FPJA8D5wot2bIAzVODM0P%2FTvEaWY2ykIjYMuahn8wjNtVuPFwsRr4KLSfDkEAMnFTvL9V06pvm6a0uHuO9merD9ewXd%2B69yt%2Br0wx%2Fa%2BrbswDqf1%2Buv%2BjfSF7lo1nXXtIOvwPK%2FLbvqrvx%2BPIdWRkum5Y7DMJra7FCNenqHlkYPjbq855sc1EIi%2FSQ1gqQQC%2FAqihaZ%2B7S%2BRs2c4M1DuC04IAHMIFJY7gYH1Z05a5LgQb4kBMLuM18eDOXB1EnoqYHu7XW5gY%2F1DfKOOpYlxM7Lz9XqQ7Otu7oBcH1uuq652YtBvBPbbjj5CTcq5R9f6m8wOVLxsFl9c%2BWQYlV%2FdkhRwjyF0VtC0FBuq61Dist%2Fns8vynV5VS3n79bbrlwvqrPt7dUIp57NDxa0xRjfT4DbKBzadPm3hlubVxw%2BG2gTK%2FP5aI6N5tnHizE4UxeNPMdeKjBMC4RZgujixMEMWQaNSkgKJP8KbX0J4VkMJwvMrFBcmIS%2FAj7LzWa%2BrdrbeoEQZZvN%2FFL8eXxoEm9q2JTOje4Lu670YkeA5I4Hct8pA4PW07QJ%2Bgk%2BLNuXH4fgVGS2Csco2sBMkOkJt5ARzAIw2hgqMjYw2oBMNPUsF3Eccx0aCxY%2BzX8JZNbzm3JxXa%2Br%2Baoq23W9hpOy5mpdd%2FVtNSGYjiyoH5gr%2Fwuj1DtkQiPMPCBJQD3EJ%2FqxLMKYiiAV0FNZ7z8xmRVKIQejQrx9FhXcAyISESziNsUhBdwHYE9FOocRdKFjSZ4h4ZDEvwQy1%2BXqe1cvwGDmt9W6m%2F%2B2%2BzwBHI7N5QSAaMtiKs4%2Bdlgq4qhx9KVsGa6yjFP%2BGdrQED0ASeeLdTpEY6oQ%2BdsFy95c%2FsZIGI3SXW8%2FfZy%2FhyBsmEdkiHpMq4JvGwLAuW%2FLH0ak8RYBJWYHuUsLMWUmqbJAzA%2BRRMvgVacP6EVzs9lBvFkUu%2FUCnjlnm80EEK1CI4Ho0D%2B6A2BmsmwhVYwE1kxDq%2FAJJVcmeVeeFIBzEENshul4BU4265OwY1ZAQzAikoaWW1nmFppcWmh0WwyQTRPhylLvF4CsHldBYmZelIuuab9PD7Oxe3TMmoktNju%2F5EkAsiffoNJbIQo3ENyUAMp74L2fXWqub9CbdoLxPnFnf81kllfmdAF7kXbCpchX0FhqH7hIYfII3HZNC1%2BT4pJ%2FmrPFotmtuwnYzWCcXY2PjkEz1WXLqypogXdftatqCymCy3%2BeO8T9q2yr62a3rbTTZtWqA1r1vPzKDeN%2FdvUStDGr3barWowZJo8k3Z%2FETpn3XXJ8LEVjguj4WDITUjZN1B4GH8JvVJMxogGpa8vbajVvq66sV%2FNmsx2sryqbFcu0PWczKVKc8iCXTVFfOJJJL4XSoi9UrKW5dBoKeXNuhDMwlL8iYj%2Fs2tu6upuwDfTDo%2BPWzFWhUCSDMfpSV2C4LqqurReQFKqrO5keHWv7OK8T9CGJjlUCWGIokb2dD2G95hkjAGOMiLNmXgOhfKTh0Bflb%2FbH%2B4%2F4fjOpHRjS%2FIdSBzxLxlVbLvgL%2FfSIca7iVYkvVVvcTZZJiXFDRv%2FeiPuwSGSklSc%2BTi%2BIU200yDjp0N9VMssgoqDqi3FGYs9ACGVlIuPFJBc9niK7By1N%2B1Eh7sf37%2Fr8Omdh1tU72eMQ9UoxMHMPPHJMh0fICyJ3mGDOR5A6qUbM6Fxjhv4f5tk5dzj2EXki1JdxQ%2FBz2UYz0V7s0cb9iFRJiTAPZxPd%2FtBHYQvoD9gvpeB0n8Z4heGIyvFNKofYZCAeCZ%2FNfJnZxD3Lri%2BCYRoBiJQ6XM%2BP4Gdd65kUIlwVQXGM054INjsBjfrJv6oFT3pfVmW7uD7dg%2F16jYuZzGvMF836tmq3JayNJ6f4eorTdFE0yhP5gTQ2SJIyX%2BqulP0YznWweb6Ui6POSnCjnFIqMJ9kbeCiXC3mm3LxFaKGTdvcNPPPu%2FVyVQ1ax9U1gSCSEsxMJTM0Hlz%2FP5NUVKzNdrRmNBYTGDiBAM3aTNyHZb0R73ULgn3d094v9Xo5v66vruf1ugO%2Bc7feNqsl8PLL7bjN%2B%2Bg67JiE888zaAk3TAwZQUq5iOFT87Vay7GRgl7QaCR77ZyZvRZJDo2x4%2Fdw1Wpw%2Bf6DCkHt%2Bn9GsMu4jCPSEMK9vkS7XMWuSKNwL3FselUuh4%2BB7JfEE5fTQsujP6ERzbMi32NEZ0lA6d%2FaiAbu0IiGFibGT6yKjOczomZ2%2B6LZlujyoZmUe7wwvQXhq%2Bb2ROXNpt%2B1ocQ%2BxFVpw6JfrxU7zXf84AfdYmarcreEoPkS9naB%2Fig8CxWsZXD%2BflOt4WHTD0ms6UIenPCXOH5IEsZTowaJmc8eyNx7TfGs3F5%2Fbsp2OYyMle1EhKVUU8epkDcEOycYROT3hIgodQb7zlBlAZ6tiqf52svdUwzlfwEYapHxh%2Bauaufpu3l%2B87laLqvl8RFIk7Gi4tgpQmLLVat9fKHIoXFFMNODD7Vd7iGCNi3iHQa6J3%2B8%2F3g6SI6L5xxQ0FsdEf78AHEbY2iW9xskxXu4EvmxFugqcYi%2B13CGVylT7t5uhdfWv0kMTnGSaAS9itSUol%2FqPvb5ThS%2BZGpDFR0oRUQiH89PMs2BMxuKAbMI%2BmMZGlJ0ifnls5O3nz6%2Byf%2F8%2BIa4JHKTfa77ICRlnngJmogoU3hKsbZTkooRp5hXEFIGf8C8iQwtD5jJATD0oQo6gDToPeSXiWx%2FaHvDr%2BmUJckoNRGYayCRFLNugpJn88mITaVw2ATxHTjajt0D2hqaY4Smoh0FP8W1ob2gzML8WPmY8SbdvTNJrb%2Bpx4mlnkaK0aoVMjQqzIb2qglYfgNJykESW%2Ftq%2F%2BwSUebeqI1mQkZMuShfmRcVrPH%2BSU48ehY5JDwd7h0fCYnG5N2Jh%2B4sXCXpRm6UIPu4nzIb6jwtWlA08tzhwbXlJD5L4m%2Bn0kaLE%2BBpCVgmRt9%2FYif%2BGfG%2FmdKmVyPyREaEWLj9lzYipjCkd55%2FaLOdmJtMfJUOix7EPSKBsmH9blMjK8AnGY01P0D3t2WRA5lfRUOBgBdsh7l7ZIL%2Btj3seze%2F7HbLupmexx3ER%2Fe4TTnIAzzuZOhxS25W7MO%2Fz7%2BOEO2p5hcG4Fyn6KODj%2FzAfaj3%2BbHI0XFnXSTNKHJ6MteV6ndVOml0I1O5fVE4zplWKkXLCR0ihHGacR3V4dyM6XdTFNBy5Rgy0AfSd8pH572uknWZfKVDPoFIP2GIJBI%2B%2FAWVwFcL4IfsUW8pVNZu7IfzCjX5wP0e5avg0ZwOoMCsWtRmz7MsRn4UFd7%2F1bIYPNS39tznWxdN4c9Ba6PiP9O5Vnt%2FTH6dB4u5NrlNx9lMf46moTQ9lIlzhlnnQzM4GQbdaka5GESareM6uECLruVyLtMJAx8b%2FNdcWCX4IIJqOd99TV6qkuzcD%2FU0FmHPqxgsW47Cfa79A5JippmLBC1xcRKdBdenwwRegHWelA00sjCkMBMxjmWzirbtiu9GONDwVNwj8eT2cyZWn1QaMxiDXDIEiba%2FBp9D4zHfyNHICgmVuN%2BRDo8I%2BDZ2G135EDi9mrrnMXWhZWvYi5s6U5dmCdctbgeuuImcqqk73rOgogfDwTC9mn5GuyJwFxWPPGGTuMMxDCnEOm%2BUCuP2Gb2Rg3XC%2Bo1D6JJwAY7pXI1ZWcPdGr63IEZSyRJw6QC8USC8L05XpKFgILhiqXeCZM8NlHxjL%2FAhrqlFvzxsqNpBpYYSP6S%2BuBsWcbOUvoihAzm3yQqxpA03kT5zQbTczeM9NILv04z9rY0IpcPYzJaP86klOHtGGsHUCA7zw2MQDXJxzEcCQcFVzgTuDCTSz7JXVuHy00hMtoQoJ%2F4fu%2BVVJWFeHKTFXwmCR1RVmdwOfGKrG3EfIQ6ryw%2Fm5JT8B5aTmebpa5qYexVaakrsl17iMtKvUYV04bDdolqLdPNgK%2BBMu3u0AjvmOySURVUyGSL7GtmL0lK%2BzYom%2FV5vcfNM7vwqhORHUd1CZ%2FRAISkW3AklgT6SmrlyJ7qxg1zsMtfzCmb1AusmzGx4n71drNS7gpBAb5tFQtrFAHgfXHmu9JZTub1dDK0cl7HS941MZ2QSQIXw2%2FfFHL04CxvCvXQRjmggUyIvpWEAbPmaby%2FjFXuTVL5AiR%2BwKi9nO2BKxOObCxdpJtO0XDzN9W%2BFTZKmeimWSjQpN7M3yQa%2FsbpNpZ5VmVsD9n1vGxFb30gqxhZeNhXRoTiZvyPrBYr74%2Bg0FzttaSwWpp695uU61ZYJzk9H9rx1Gsjh5ZNMFSdT7q1pTB7gfr1MxDZL4tiN%2FtbOlheMNM3WzK9toVPVyp9hpbMVmznITlGUW%2FQrnanSVStdJCMfs5x0IielboRUCT1XbjMv5NIp1QmPW%2Bk%2BvYEVXRWRTKJQMz5mU9Qyx8MvoglaVMlttBiC8y5kzlQKWoQMVhMnJwd3Ryjv1FSIc0OiPIHMVjZ837rhnWpOayQDvNQ2ZiEG3qnGFqr9GYpB0mq79avcIH5Fkcs%2FPvyBIhePnBotIqeOVXZ9SNnNrZ%2BsHctim0U%2FoP7W9p2P9AdGgn44X04gVchCP3BIFoqDWsRrqMr72rZS0cSzjSyESZaFrmv2h38qNT8jrXdfp8G1Kcf5M5mmTOAKpNlBBbqhN1e99PA8DfocfJZTKo3EaFUxJq5d%2Fs0JSt5eq%2FjApLk5qfCT9VhfF6UDi5JPH7ooPd9GG98U5d6D6zFlZKJLOf5m9RUebM1shnKPraX6mmYtuB4LQymCP1WNUs0zLP8uuQytgIXhDypTME9Y4GW%2BdLxnSOYf6BW8JQv69ajPSZoTVP06BaoqeU0M5g63VhKtNDNfkUaFPIjLPsidTtb%2Bt5euVwOhOpAHxGAGsXSdZHT4s1JXuK57q9%2F4Z8M%2BlSSu8I1jSafGdhMDK5EreFs%2B9nAfOqjXA7afimVTbWscmFZ8mdQVyZk0kxGrXhtY20gocmf6kUCmoPDy%2FvVE8eGxKE0zyapGpb4ZVV%2FzXIFNvuIKrkHl%2FFXSR6t5xZNq99Hg4SBIo4WNvOUav6c04Hnhaz8V8NiKxL%2BoAfdHBbOj0NTXqK3fg0TQ8%2FFnvqlpv6gXbbNtvoC502sB9wUvLt9robVRvJi4KRqvy%2BzdhTQxo6JBk6di62W17nDDaIFdMH83mwD9OirXk3jH1mf5phxZ7sYa1IseVDvr02XcdlMXbW6%2Fgzy7%2BF3aPb7IY7ZfcJ6J2D8gZD6TR9K2WuxajqTfq%2B9z7JAplJwIJ4cliypVYOlAObEDxUr4pu5Q8z80t08gi7sHeZ%2B1nT6g1lV317RfeXJI9Mwc%2BuX4oIrp5EBlqSdm1qXXdqteft921Q1s7y4%2Fr6pBmSfQExYiTV%2F08QBHjtJ8RRomTVXi5NF1I3ulEP1zfFR5E1z3TKXgxfmXVXMHwGnR4xzhChPiIjs91HiMijgoxi4GwHABntgrpwXGYx2I2gKntuhxfVkgJbiFXHK9PqT6ldB43lzNmdywOv%2Brab%2BCZz%2BFkspe6E4OnjZ1F9VIVZ4ueuiPFxhAqZZXlezFpu2um6tmXa7y%2Fmg6DBL7c84b%2FP0LOPjvquu%2BizErd10zBNyP%2FSjHaLgHP5AoYQFR3Argm5aLr1fYQBu1yF8W3vAwHoi7bXbtQpwlf76iK9urSpwmSgqbwGmrVQl1wQd3ewYUmPocSzKdFEDc3J9MfB1zY8yTCY65KYcBPYVZl5%2FLfPmGK1Fq53XA7xtwadgnNeK2tPD%2BKvlGFfvXcX%2FAuHvTG%2FfAzLzoiUhTIsVp85ngtNnrqv6QgSe2gfePO%2FC2KiTG77coakCRJhMY7YO%2FFDyB0fZtox0cd7RNhnVYSHoCwzr1SRzYhjU87rDafpvBWrU0lNnfUOjludLwddwfOe7RccfdtqH9AdUQ%2Bj2XsrLyKwDuB0BkA0B8XADY9hhb6tCKQhlcWjLTygoUtnqzr1h4HBbocbFg0nRlPf%2FPrsJGaNsCRvkFleHiuwrMtMJRfLtDla6fcPwP%2FNAv7DYJfwIiVj7nyBAxObzBz43Y9nZHgwLVzPyBmqOYh0OVniZgHkLL2BP3uGNv29pm%2BIi9TMz48YVJjPvEl4V4guNuYfReh%2FLeoSQ2cnZf7u6FhjK0yKNfh%2FKRQ3lcvjU0aTd71aspDO%2FEF1ur0T0uqxqaPNsf50RWGzT04JMY5WlPYrtLdeRRttBur0N5vz22EePkuMR4aGHSXofykUN5XDI8tHFiZlGme39i4e%2B81D4f7SEPDhFxXJo8tAnY%2BPgzDQhKw2KU2nqFxpNAw0aaHnsJ3%2FPLlJ%2BaZoWMmCa6Hf0I2yRQcXCj2%2FHXB88mZCTHzZmEJhEGo40%2F5rdaCa21pSbY62g%2FivI%2B9mi%2F0l%2BPstXWoPq42Yvolf56uqFMjjuUNtWZWcnqYXWrXhXmD0WCbTX2j5ueiGw%2FQbS%2FFoZjr2LxCoKHg8C2SB8bBDb9ml7Fw6wpsqf4if5DugfKuyhFOyItnYYA7qW8u%2BeL8HxbpuUlVhr8tm2abvCduOZtW26u%2Ba%2FL%2Bvn%2FAA%3D%3D",
    arch2: "https://app.diagrams.net/?title=Travel-Retail-02-Cross-Border-Desensitization-Lakehouse-Topology.drawio#R7V1bb9s6tv41BHYHaCFRN%2BqR1KU7mLTNJD37APNiqLbq6NSxDFlu2vn1g7VI6kY6SbuTWDlI0QeFoiRK%2FNb9YuIlNz%2FeN8Xu%2BkO9KjeEOqsfxEsJpW5AHUIpjPyUI7EeWDfVSk3qB66q%2F5RqUE87VKtyP5rY1vWmrXbjwWW93ZbLdjRWNE19O572td6Mn7or1qUxcLUsNubo%2F1ar9lqNRqHTn%2FizrNbX%2BtGOr87cFHq2GthfF6v6djDkZcThBI71fy9p6rq1nNCnb34k5Qa%2BsP548t75r1zSvVJTbtvfvsuWytt8LzYH9a1IFpBYEJGSLCZxTFhAspDEER4wwl3CEjwliAhxsk94RjKfCEZiDiOMw7SMEZGT2IGD2CE8gDUklIgIDuBsRDiD%2BZwS5uE9Oc6PCI8IwzswnwgXFxAQlqunsAyfEuDlEVzCPEId%2Fp9DUxLqpEVbfGmq5bc9PigkIiZxiNcKEnswwrqDmMTy%2Fhm%2BDh4wn9CQUO9HQTwBY9yBx2YBvBCsNIAlxDkeMPhIWU5Eot6eZ%2FBCcG98RbilXHIIq2Dw9hdnZ4Q6ruMQil8liwmPYXXwNgHe0PycIRHd5xGE49Ph1RluSwSrhskJTKMOiRL99uOrqPPnB568vfqT0yDEKT6snXN9dXfjVI3EOI0KtW0swskRbLzaG3wtOEgIh8d%2BzC7VwxmHry%2BRxP3Buh66f8mmLLb6Cnw3uWuwTAYoFSlcekZoLs5I5hHmEOa%2BL7dVqV8Ovz51%2BBoohTpC3Rqpuf2peURTH7arEujCJZ64va7a8mpXLOHsbVPsiCeu25uNOv212mySelM3eK3n5G5EOfHEvm3qb%2BXgjJvR2BNwRb1tB%2BM5y3meEE8Um2q9JV66Kb%2B2cINdsay263P8K3UZ8cT3smmrZbHhauZNtVrBovGWite6gf5bvRAssmNV8Iei87Jpyx9HOYirGBqKgrK%2BKdvmJ6GOusBTLFAJAc0Rb4cc1VGD1wNuGiomUyguvu7urNmVlxCaK%2Bb0K9zLs3CvhxCOyWmOk5IkbTZkVAFhIbLDI1wQiD0CuItEMQSRjZYhPEXswJDyIV8c8ISjfAMuZMgxFPGENgbC4KEiViPAs%2BWLxH8P%2Batif93NhT8uirYtGwAmsAnfJI48y2lObcSRJjSkYXdGi2b3XWCBfVvv7iUX2g99hukps5DFkGyoSZndoh6fYlzHJJkgtFBMFDtPRTK%2BhWRMUYzyVkgOniKwTQKRYsNRSANxOhTOHE8FQG4s1GIRRbo6iIFTA53GQICx9%2BywdPI4z22wdCjzk2hmsOwW9QiwDOn9uKTPjMvAqohOdASpbzGtp8UD%2BQ4jMfJrBjNFqti08JAXp6gBTnn6EY1R82V1c5sOOWDZWkP5d70tlTKnpMIRDn4yRuzkaW7VUpw8CsNsbojXi3oExMfu%2FYhn9HkRHxqI5%2B47pelOFY2BASZ8QLNF9VCqb3L5YaL4%2Bo6jVXcXJit8J2oOTweWzXElZagHgTknBlZZCAKhIxiwDny4j5AHudLCmIvK16nQj%2F9s6Bexm7jJzNDfLeoR0B8EY%2FD7gamGuBbwUzd4KvBHJvipBj%2BLEDlDKojRGo2ArQPUf8lT8ADzVt45dpXIAZmh0P7p0L6tv75VvD0t31arcttWX6tl0VY1sP1su6625Slh7dq16zh2hStmButuUY8Pa489FNbBk8GambD23tn9MD120W8CyHE%2B19%2FKrdIhWIQQZb0GzZjmukwp18JRpirc2xuwaMmHA3xIqAzcCVmNnHGo1iiLNsZlhkA7cKuQxCmSoWnRBmg3BHjzFOhOug7jDOWU1Nhmx%2B2j3E3ddGZk0S3q8ckiDB9IFm78ZGQRG2QhUNXR%2BvdfH8tWM3%2Bp8HQMWbJ6XyEZFJJesfmfbdXCiydFW2zqNaHOH21TfC83i6Zsi2qzqHf7N%2Fq%2BTFGRcAlD96yg2mGCLpTZAPT%2FvzLu3a%2BPRJGNcdMnQ6gmiCFElUJynznXK9tCM0A84D4wePDMCbhQ8lgICASgqItEua0lI0%2BQfYbAxdmQs%2FpIB4kSEoKfDK9Zkmd2vLpukAXxzPDaLeoJ8OrFD8Wr93R4dU28Kk0DhTSI%2FM4TzgA4XGgIpgNTMAZmyMNOdci2bVMQ6pxBVEVQ0QvwkXcvR4cy6tFSa%2BYZzuk8Nqb3GRUKHileLGbEcD3Pd4NgZgDuFvUEAA6DhwLYeToA2yLPNjcHaKu%2B9hvTofjXng5bfFYqxH0U9w9EYqKCtjxDJTUAPMZebxDSXMUsOSocLNCAzVFRzu2kBAq6q6%2BNUQx03Fpd%2B8ZA%2B%2F662MFhdYO5C0Nsa8idF1%2FKzUW9r9DS9NIvddvWN0cxiXfi%2B51MoIAbFfqPr9UPIBahHpZWN2tC8031hdC8AB0MdnMFTtBiX%2B4Jza%2F%2Bdb74UGyLdblanG33bbFdlu%2F239cT3Lo2RUGFQqd4fwwcj2HcoXOo2VpQHDyZC8%2B1BSClWSYNPK0UCA4jcKNceZj7uGOuPWeJGhGZDiUmin3zHIywEZrNPAPk6Yxr1SNWNCOkgoH2Gc1V3IU5enkytEMV0%2BY54fQlgLXY7Rb7svleLRGvfLdbXKk%2FT49TGs0OqGbYr%2FcKC5%2BIYGDWR8BDufS3cZVoAcCQXucc3WOYesETZbHF8RScXX4M4Fz0COzv0KkTxq2MjJIXAchqcVMsr6ttudiURbOttjApqdfbqq2%2BlzNCp%2F%2FPDp224J%2FpMJP6rKeM%2BBhUgH%2BW8GJ%2FFYdNO0nZgsQujBzKcLPMeuptNSEGwekYGSBkXVwVoxv9YZkEC5PqhkRwavrWXgJe9%2BXy0KD7JP9n%2BXOBn3AG4JyIeN%2BiqT4zNs0wnY6JeX26oCVRLgaRHWd3TbZELQxXwBDVFOQ2h9XI7L0%2FLq4xLiEAtm%2FeEhquwRp5%2F%2Fly8eksXfzjyMWoMaeE63g6cG8BKXtmvp6phNiVZq0EK7U4HCjNs6eEZX2zO7QloXl%2B2C7hmQu%2B282AFqZqxAyIwQzb2QN2kG%2BB8htUCnTnQnJGOg69pQro3FEJQZwDYQxAG0hTyke1ROceB%2BCasGL8%2BHSlaCvXGkMPcKfd4AGX9l0A8BfoGBGSWPU7PPA5MjkVlRieoOSRalCAHwSdepwRmn%2F8dDnwFuJViiAjNBUe9jQbA4EPbDMfLIm604cwgb4gNCk47z%2Bd3Uwem7pW21m%2BPKSQucdZwt%2FJvD3u1fml5MIup%2FZux47TD10qemO%2FwCO6hFznkdILp9KSmgzCtXEIN3o6v44ZAu2imjTcwEftBJUyhaduGdPHYoY8kQ6AkDoIa44Qc99NILx532P8PmU%2FdlFZfDkya%2F6%2BGneScRV5ltzX5xVeZhTSHtQGvc1RgkIlR03C3HdE541MkolZkikbAvh5qNKjVMatrxUn6auZANi6Llc7mnRBCMuV4O2c7dxXqY%2Bxi0Gn2WN71q4dLwxmBmtqRi5tGd1mQAYNZIE0AJl5Qk0GawBYdXGzk9BLzy9GILYmaCXotpfRSmC%2BV8vr8qbQ6sM49Xv%2BENyW7W3dfJM%2BnLxqyttis5kB%2BiI6cd14p7YIqBmHPFJMMykIGCBU5WSj%2Fi9HQAeniFBPab0weagVfz6%2FgmqZd15ncZ9daDl%2FzNLAVBIZkrdXHMwciNmPXVPu95f1oS0XSdUsD9UcXDZTUPrRyVmivaoVotYaGLF7T2KoReRPylUGLLFLnzNqYjpLdeAZ6soRkBWrLD0HY4gvC5AXTfW9aMvFebX9Nj8czkA028OD9xa1DBLiOp%2B31it72H2sIQHp8GVTLTv2h%2BHFjxfwx8uC0l9V0x6KzeKjHJwBW4unQTz35HAyg3g8RTn4vtxqx%2B601l364qScpWOLuV7tO8ysbleD4368qBYF1E2b9dLzA9S%2BrRs4TfMrebTgy2V92M5BSLpuMDs4mVE3Wz1cBxcwwspmU%2B4BHVf%2FOp%2BYCcnmsG%2FL5iUApdgWm59ttUTzEgYX%2FQvPACreNEB7eqiYQTAz91pFupgsp6EQLpWZLzzs47CdZ2JiUUrNP5QlbDou1Tky4oGKNOhEoXqRaP%2B9bDgiHdxCqHYTVHtPXpwRaqL04tB8r8rbObG1YH5YNWNU7ptBi5AeqHnfmUa6h1U4IwUYDfEps2X5wLB9aJQHoShd19pukA8Xfk8cA5Xu02Wv9alU20gVICv3YATxIgYf4%2FJTV0qcTMhJ5X%2Bh7a0y1yO1CHhNXfCjqimkgWOWbhr57mYx5%2FOEcn6pIuJlhnLicOwu932TjrqozSiUEz5ZKIeaoRzIDXT65jrozRHxIMYYI9KyvoPEGJiQ%2B6Uhhjm8OmrDco%2FHdCoVUswUQ8tdVsxBzU5HFlKsyFZAMqsxHxjsXYKkDPhw5bUHw19VSk9c81M6le2rfEUifNzfQriKbSj5xiBErCbLco%2BOerRUfKWVR6IVt4tpzolYzOiS90a7e8wQ08Q%2FKvPdETUc0dm1qxpAFB32qgtbrjLYZCV%2BICxReunEEtSSJRBotyh3FLxleTXIsnD0zAgoh%2FkD%2F9fxdAItjAY9jMz4WBcr6JQ1dIeJbOpQk8RjZitLskzHzuVcJU%2FAl%2FZHHcI4cpxX2nss2vP8%2BdGeZ4bA%2FDeDXE9fYTSWggKRLytLAEdGCNZGeyHwdyaUIRNHOjgRajUuUp49RUiTJmAoVFg0gL%2FW7KiDSt9I7kH4Ixz0VdIRt5EzWWqCUtSCaRQNRF6ENQT%2BlKSOebt9ZS7JvmKyskvZX12exSsBPZbF5D2AgIJnJiAzivehWjb1vv7aYouLvihwiqhRoWGXWm1L4elSTmEO0ySVa0YuG8vECDbn6urTVBeUpNVZMhEcxDJ2whGqnRhAwhC%2BjgUKi3U3qCJT2uzs3QGy8QgmbON%2BLM7SGdj%2FjjMJutBT2%2F%2BeGfz7UO8LDJJgvfX7oi1vi58DfJ2fy0LCYaX3pP1d11ax86ebOsbIY9CzbhniM5i5pWi2S5%2BUHF0nq70wt5W1EEY6sD7tyi0%2FmwFsp6nVM4CtGSu8%2BrlvyxtoC1N82ZR7nQVmpFZMITLGoXaogo7OBv4e5KQK7LmCKJb%2F4WRPqQpdOFupAfngrPIYqfTOsWCQKrqmGupg3pQz8E11Rj3q81JCgMzINY9HHUlgOtv8QX9Tb6u2bgjNP8ijGWB86pqdAcZtzUfNWkHWe25YV7Zqq3edVrdOYFKu1qX%2BqHXTXtfreltssn5UjLXYfs55jWX7MPh%2FZdv%2BVFtYHNp6DDdDg%2FWjIAiPNcOY9qgY9obWKAE1cwPgFcXy2xoXaFOd5cvCG94ND%2Brs60OzVLO6qvu2aNZlqwdDO5CaclNA7eLodk%2BAClv13wPKoZUCacrE1303992b4b5bGmBe6b7xU9fS614%2FfK%2F9Ge61rXAMm%2FOqFNBA1t%2BqIl1ZhjuDrb6ziOgRt%2FqOdjbwWYK%2FgYZghmgwA0sDUkdVVehmcHE8xEffINEoCZoDXO5suTkDzhDasMBOiwVbVY5Z1mj6Qmew3XMXBNbtjk663b7pqh%2BkTxtlrmOPd1cYMEyLGDtq5gCLO38%2FYAawiCywoM5pYWE6oEcVHtZflABPSKI9y6%2Fm3wO2XnsAxlt%2FxI%2FwXFtvK9bAvCz1Gw5K9H9Kr4i95F12MPIHLWN0l9c5QOLOmNYMIOHaIOGfFhKWuok5bOXcqdtm5J96K02XX%2Fb5fMrSZbHV6xbfv8U2214m8p9ui4907%2Bps%2BxDF9DCEgCPSv6NSF2Q4Q4p1gdlAudb100Ey4StC7kWIzd6np7X3fUsPrdetvH8rbfYbPbH9ZnHkvW7lb27laT0vvsUL97qVv7mV8Wm30uJEe93K39tK77SekMDmIOt%2BVkf3F7C1FbC1Epp0MZgDJoQfeM4zYOLpQiqe1YtCTwubI31YxrCxJM%2BbXcadSbOKWOdt8lyVMbyC6fHApOtGZgWmI%2F1Txh5Y6vAL%2Ffs1k1%2F9eoXGo0DDmqxzWk0jsLU0MVt1237H62jLPMmU2CAVDLkT1yUQYh5hnbkHd9kM0WJ6%2Fy6FasNulgjEmFHt9z85OIddfy4V9gnVFauH%2F7QeocDmMzS7V8qDrleSWUP7iojfQoRNsJzYhA1sffZfEXFKRDyLJYxnm7puR%2BfUNe%2BbYnf9oV6VcOV%2FAQ%3D%3D"
  };

  // Encrypted Live Azure Databricks Workspace Manifest (PBKDF2-SHA256 210,000 iter + AES-256-GCM).
  // Zero plaintext workspace URL, tenant ID, email, or credentials exist in public source.
  const LIVE_BUNDLE = {
    kdf: "PBKDF2-SHA256",
    iterations: 210000,
    cipher: "AES-256-GCM",
    saltB64: "6GTLrRDXTE3Z8i7SyRLeww==",
    ivB64: "RV/+3PRESMXfJ1Er",
    ctB64: "FJOLh2kNrEC0JAPdBYeVKEpoNN1GM4GeXKRnT8KSs5KmY5exUTUbLDR2mUgfC8iLRx678UITpjZ4wcatPWDDHomvM3SwGTu/H+OP4jNwxTsmKYeEvVZOM+Q/wQ61iqEVC369M6jtyduGDo/UjnbE3LHOZ63k2m3qWJD9udo7DDh5OIc7W2IcCvvFE/elzR4WwZ30elbUw1wm4bSxfuQ9+sZnL63mFYR9ohBjqa3J+H2FuK5JtEOvpr/6S29E/oBYniH+ElytAgSa1jOBVaagk7gL1MoXcPq8atg0jg40b1m+/mWeFT019zIj9ityfKw0x4XMoyVMdaN7fThxAVSt4Yjo640KUsUnAv5Jor1OEg1NrXObyoLKdn4WZDyQhzfrHAxrravca5shzeGrR2bSUSuM5We++OZVUqf5pOgRLWO2CNJARBoqI2r0QJ8ZQMPXYP5GQpWS5QABfVW8oF6cxwUHBF33m05KyBathyfTk7QIHGRU3Mo0gqBKer1Uq5AflAw7e/Qca6PKNa/s6dHpBbxte4EVa1504bk/XvrefjYie0iUeK6z3mu5/UhnEcvp8A2kdubLzw8lG8eqXxk4WCevorNReOqf61ePGTCLuhIj8jLEhAesvTEEg9IJlZlbnA2k1vjSFgR3+qVmdecfLC+ZkMk4dVYkahV59lEnqdm+PBpJ82mT6AwRu6lDEOZLmPvc8hVaBkMLnB+y+Kiwv/av/OL91wNxiqufN6aywqBmm6M3iyWyzEE5PnN5PIdbemu1SruypYCiUCAlJSkZEN5LoR+0XHq7eKmxVphGMnmfYgj03y4dAuQu2YUd+f1qqY1D3F83j/+YUPs1czb+yWh9KfkSZhcpJuJWPkqMJZPPHwW8tLA2xl6OgSH0u6FD+hWQ3HNLkhuHmEkqJvr2kn4BeCsjDHCd77AU42u3UMrTWiBlPOyiMw8r2+mY4U2bfgiWPhICvcbcUvkHe5AuqW8GdiCcfw3z6Qosjwq8omusVt1wQTIRonSKQJ3Mp6+ayY15e45eYc06wG3pNzZa+oacwrSux0eu4oL5cAsEZgGvGPw+xI1mdcmCwpqMtTb8RmGKWx+qZFQg7Mw3rHRa9PScrV4wnVHucGC8ozpdgRh1hmi2rUf16NoxwRCvVZi51HR+NubBmPn4OylNKYy0KX30rfrgJzODi/e2oBJqrujqoOCVxqg9uT/GJe/cY5qz14LIfvFfnxjSRYLcrKr0UfYcSs8Z2udNXuGHVfA56R639MYCk18KINAoyvW4B8rgfqrF2YxKaYSldUhAwKCDo4sKaBiSfYcqMijmOTpmsO5fjQ1oVORGXQ8d7Ay2LMwMP6OtmUbbuFMvLHuTqSzMKTjdHEYzLOZZ6Y/E3/dEo2jIjpPDumJGo7zKZ0FyaTvRKItjKym/s2etrGPxXl4fyzUi9mwcsS/qS8HDtARYLseJs7SHZwzLqiv/83POEZdCcsme1nktCWyxG2h2Z2f+dtdM9jLOMmCQepkl0+eHoNu3/6XYqjulbVKndivDs/Cmj6z3Gmv6y38SsLaaAxgOxpAEpA=="
  };

  // Sanitized dummy fixture manifest used solely for WebCrypto unit-test verification (__gtrVerifyFixture).
  const SAMPLE_FIXTURE_MANIFEST = {
    version: 1,
    tenantId: "00000000-0000-0000-0000-000000000000",
    workspaceHost: "https://adb-0000000000000000.0.azuredatabricks.net",
    orgId: "0000000000000000",
    warehouseId: "0000000000000000",
    catalog: "travel_retail_ops",
    corpLoginHint: "demo.user@contoso.example",
    corpDomainHint: "contoso.example",
    tenantAdminHint: "admin@demo-tenant.example",
    routes: {
      norDashboard: "/dashboardsv3/sample-nor/published?o=0000000000000000",
      norEmbed: "/embed/dashboardsv3/sample-nor?o=0000000000000000",
      roiDashboard: "/dashboardsv3/sample-roi/published?o=0000000000000000",
      roiEmbed: "/embed/dashboardsv3/sample-roi?o=0000000000000000",
      genieRoom: "/genie/rooms/sample-genie?o=0000000000000000",
      agentNotebook: "/editor/notebooks/1000000000000000?o=0000000000000000",
      catalogExplorer: "/explore/data/travel_retail_ops?o=0000000000000000"
    }
  };

  // =========================================================================
  // 1. INTERNATIONAL TRAVEL & RETAIL DATASET (travel_retail_ops.*)
  // =========================================================================
  const PACKAGES = [
    {
      package_id: "GTR-EUR-202609",
      line_code: "EUR",
      name_zh: "瑞士阿尔卑斯与巴黎免税臻选10日",
      name_en: "Swiss Alps & Paris Duty-Free Couture 10D",
      line_zh: "欧洲奢旅免税线",
      line_en: "Europe Luxury Duty-Free Line",
      hub_zh: "苏黎世 / 巴黎奥斯曼免税旗舰馆",
      hub_en: "Zurich / Paris Haussmann Duty-Free Flagship",
      departure_date: "2026-09-18",
      days_to_departure: 16,
      quota_total: 180,
      sold_units: 168,
      unsold_units: 12,
      sell_through_rate: 0.967,
      hist_benchmark_rate: 0.925,
      rack_price_cny: 56800,
      breakeven_nor_floor_cny: 41200,
      gross_package_cny: 10917000,
      dutyfree_addon_cny: 2563000,
      tax_refund_deduction_cny: 1085000,
      channel_rebate_cny: 2095000,
      promo_offset_cny: 540000,
      refund_claim_cny: 792000,
      core_tour_nor_cny: 6405000,
      net_operating_revenue_cny: 8968000,
      nor_margin_pct: 66.53,
      hist_benchmark_nor_margin_pct: 79.4,
      ai_forecast_final_nor_cny: 9385000,
      health_code: "HIGH_SELL_LOW_NOR",
      health_zh: "高售罄低净利预警",
      health_en: "High Sell-Through Low-NOR Alert"
    },
    {
      package_id: "GTR-JPN-202612",
      line_code: "JPN",
      name_zh: "北海道粉雪私汤与银座免税臻选9日",
      name_en: "Hokkaido Powder & Ginza Tax-Free 9D",
      line_zh: "日韩私享旅购线",
      line_en: "Japan Private Tax-Free Line",
      hub_zh: "二世谷私汤 / 东京银座免税贵宾厅",
      hub_en: "Niseko Onsen / Ginza VIP Tax-Free Lounge",
      departure_date: "2026-12-12",
      days_to_departure: 28,
      quota_total: 160,
      sold_units: 95,
      unsold_units: 65,
      sell_through_rate: 0.594,
      hist_benchmark_rate: 0.815,
      rack_price_cny: 38800,
      breakeven_nor_floor_cny: 29500,
      gross_package_cny: 7372000,
      dutyfree_addon_cny: 1625000,
      tax_refund_deduction_cny: 695000,
      channel_rebate_cny: 612000,
      promo_offset_cny: 290000,
      refund_claim_cny: 115000,
      core_tour_nor_cny: 5660000,
      net_operating_revenue_cny: 7285000,
      nor_margin_pct: 80.97,
      hist_benchmark_nor_margin_pct: 83.1,
      ai_forecast_final_nor_cny: 8665693,
      health_code: "QUOTA_GAP_ALERT",
      health_zh: "临期配额去化预警",
      health_en: "Near-Departure Quota Gap Alert"
    },
    {
      package_id: "GTR-MED-202610",
      line_code: "MED",
      name_zh: "托斯卡纳庄园与米兰高定买手11日",
      name_en: "Tuscany Estate & Milan Buyer Couture 11D",
      line_zh: "地中海高定买手线",
      line_en: "Mediterranean Couture Buyer Line",
      hub_zh: "佛罗伦萨 / 米兰蒙特拿破仑买手馆",
      hub_en: "Florence / Milan Quadrilatero Salon",
      departure_date: "2026-10-21",
      days_to_departure: 19,
      quota_total: 150,
      sold_units: 144,
      unsold_units: 6,
      sell_through_rate: 0.96,
      hist_benchmark_rate: 0.915,
      rack_price_cny: 52800,
      breakeven_nor_floor_cny: 38500,
      gross_package_cny: 8420000,
      dutyfree_addon_cny: 2140000,
      tax_refund_deduction_cny: 780000,
      channel_rebate_cny: 690000,
      promo_offset_cny: 280000,
      refund_claim_cny: 120000,
      core_tour_nor_cny: 6550000,
      net_operating_revenue_cny: 8690000,
      nor_margin_pct: 82.29,
      hist_benchmark_nor_margin_pct: 80.5,
      ai_forecast_final_nor_cny: 8950000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target"
    },
    {
      package_id: "GTR-NORD-202611",
      line_code: "NORD",
      name_zh: "极光玻璃屋与哥本哈根免税8日",
      name_en: "Aurora Glass Igloo & Copenhagen Duty-Free 8D",
      line_zh: "北欧极光精品线",
      line_en: "Nordic Aurora Boutique Line",
      hub_zh: "罗瓦涅米 / 哥本哈根皇家免税中心",
      hub_en: "Rovaniemi / Copenhagen Royal Duty-Free",
      departure_date: "2026-11-14",
      days_to_departure: 22,
      quota_total: 140,
      sold_units: 129,
      unsold_units: 11,
      sell_through_rate: 0.921,
      hist_benchmark_rate: 0.895,
      rack_price_cny: 46800,
      breakeven_nor_floor_cny: 34200,
      gross_package_cny: 6950000,
      dutyfree_addon_cny: 1680000,
      tax_refund_deduction_cny: 640000,
      channel_rebate_cny: 540000,
      promo_offset_cny: 225000,
      refund_claim_cny: 95000,
      core_tour_nor_cny: 5450000,
      net_operating_revenue_cny: 7130000,
      nor_margin_pct: 82.62,
      hist_benchmark_nor_margin_pct: 81.2,
      ai_forecast_final_nor_cny: 7490000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target"
    },
    {
      package_id: "GTR-APAC-202611",
      line_code: "APAC",
      name_zh: "新加坡滨海艺术与樟宜臻选6日",
      name_en: "Singapore Marina & Changi Boutique 6D",
      line_zh: "亚太海岛免税线",
      line_en: "APAC Island Duty-Free Line",
      hub_zh: "滨海湾金沙 / 樟宜星耀免税贵宾廊",
      hub_en: "Marina Bay / Jewel Changi VIP Lounge",
      departure_date: "2026-11-04",
      days_to_departure: 12,
      quota_total: 200,
      sold_units: 184,
      unsold_units: 16,
      sell_through_rate: 0.92,
      hist_benchmark_rate: 0.905,
      rack_price_cny: 29800,
      breakeven_nor_floor_cny: 21800,
      gross_package_cny: 6180000,
      dutyfree_addon_cny: 1920000,
      tax_refund_deduction_cny: 540000,
      channel_rebate_cny: 490000,
      promo_offset_cny: 210000,
      refund_claim_cny: 85000,
      core_tour_nor_cny: 4855000,
      net_operating_revenue_cny: 6775000,
      nor_margin_pct: 83.64,
      hist_benchmark_nor_margin_pct: 82.0,
      ai_forecast_final_nor_cny: 7120000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target"
    },
    {
      package_id: "GTR-GBR-202612",
      line_code: "GBR",
      name_zh: "苏格兰高地古堡与伦敦百货臻选10日",
      name_en: "Scottish Highlands & London Luxury 10D",
      line_zh: "英伦文化旅购线",
      line_en: "Britain Heritage Luxury Line",
      hub_zh: "爱丁堡古堡 / 伦敦骑士桥高定百货",
      hub_en: "Edinburgh / Knightsbridge Luxury Arcade",
      departure_date: "2026-12-15",
      days_to_departure: 31,
      quota_total: 140,
      sold_units: 82,
      unsold_units: 58,
      sell_through_rate: 0.586,
      hist_benchmark_rate: 0.785,
      rack_price_cny: 49800,
      breakeven_nor_floor_cny: 36800,
      gross_package_cny: 4620000,
      dutyfree_addon_cny: 1180000,
      tax_refund_deduction_cny: 430000,
      channel_rebate_cny: 390000,
      promo_offset_cny: 195000,
      refund_claim_cny: 80000,
      core_tour_nor_cny: 3525000,
      net_operating_revenue_cny: 4705000,
      nor_margin_pct: 81.12,
      hist_benchmark_nor_margin_pct: 82.4,
      ai_forecast_final_nor_cny: 5980000,
      health_code: "QUOTA_GAP_ALERT",
      health_zh: "临期配额去化预警",
      health_en: "Near-Departure Quota Gap Alert"
    }
  ];

  const CHANNELS = [
    {
      channel_code: "WECHAT_VIP_CLUB",
      name_zh: "企微黑卡私域与礼宾老客转介绍",
      name_en: "WeCom Black-Card Concierge & VIP Referral",
      ad_spend_cny: 580000,
      leads: 1460,
      intents: 720,
      orders: 164,
      gross_gmv_cny: 12980000,
      refund_rate_pct: 3.1,
      net_nor_cny: 11540000,
      gross_roi: 22.38,
      net_nor_roi: 19.9,
      cac_per_order_cny: 3537,
      verdict_code: "SCALE_UP",
      verdict_zh: "净 ROI 冠军 · 扩量加投",
      verdict_en: "Net ROI Leader · Scale Up"
    },
    {
      channel_code: "XHS_LUXURY_SEED",
      name_zh: "小红书高定买手与免税攻略种草",
      name_en: "RED Couture Buyer & Duty-Free Seeding",
      ad_spend_cny: 1080000,
      leads: 3580,
      intents: 1090,
      orders: 138,
      gross_gmv_cny: 10120000,
      refund_rate_pct: 6.4,
      net_nor_cny: 8460000,
      gross_roi: 9.37,
      net_nor_roi: 7.83,
      cac_per_order_cny: 7826,
      verdict_code: "CORE_GROWTH",
      verdict_zh: "高净值获客主力 · 稳健扩投",
      verdict_en: "High-Intent Core · Steady Growth"
    },
    {
      channel_code: "SEARCH_BRAND_SEM",
      name_zh: "跨境奢旅与免税高潜词精准搜索",
      name_en: "High-Intent Luxury Travel & Duty-Free SEM",
      ad_spend_cny: 910000,
      leads: 2320,
      intents: 690,
      orders: 96,
      gross_gmv_cny: 7240000,
      refund_rate_pct: 7.2,
      net_nor_cny: 5910000,
      gross_roi: 7.96,
      net_nor_roi: 6.49,
      cac_per_order_cny: 9479,
      verdict_code: "HEALTHY",
      verdict_zh: "精准收口 · 维持配额",
      verdict_en: "Intent Harvest · Maintain"
    },
    {
      channel_code: "DOUYIN_LUX_LIVE",
      name_zh: "短视频达人免税专场直播间",
      name_en: "Short-Video KOL Duty-Free Livestream",
      ad_spend_cny: 2250000,
      leads: 8420,
      intents: 1960,
      orders: 185,
      gross_gmv_cny: 13680000,
      refund_rate_pct: 28.6,
      net_nor_cny: 4280000,
      gross_roi: 6.08,
      net_nor_roi: 1.9,
      cac_per_order_cny: 12162,
      verdict_code: "GMV_ILLUSION",
      verdict_zh: "GMV 虚胖 · 28.6% 退订吞噬净利",
      verdict_en: "GMV Illusion · 28.6% Refund Erosion"
    },
    {
      channel_code: "OTA_TIERED_DIST",
      name_zh: "外部跨境旅行社与 OTA 阶梯分销",
      name_en: "External Travel Agency & OTA Tiered Dist.",
      ad_spend_cny: 1720000,
      leads: 2840,
      intents: 930,
      orders: 152,
      gross_gmv_cny: 11260000,
      refund_rate_pct: 9.8,
      net_nor_cny: 6980000,
      gross_roi: 6.55,
      net_nor_roi: 4.06,
      cac_per_order_cny: 11316,
      verdict_code: "REBATE_CAP",
      verdict_zh: "高返佣侵蚀 · 严控阶梯佣金上限",
      verdict_en: "Rebate Heavy · Cap Tiered Commission"
    },
    {
      channel_code: "AIRPORT_LOUNGE_COOP",
      name_zh: "国际航司白金贵宾厅与私人银行联名",
      name_en: "Airline First Lounge & Private Bank Co-Op",
      ad_spend_cny: 760000,
      leads: 1120,
      intents: 460,
      orders: 88,
      gross_gmv_cny: 7480000,
      refund_rate_pct: 4.5,
      net_nor_cny: 6385000,
      gross_roi: 9.84,
      net_nor_roi: 8.4,
      cac_per_order_cny: 8636,
      verdict_code: "CORE_GROWTH",
      verdict_zh: "高客单免税连带 · 联合深耕",
      verdict_en: "High Duty-Free Attach · Expand Co-Op"
    }
  ];

  const CS_FUNNEL_TEAMS = [
    {
      team_id: "CONCIERGE-SH-LUX",
      team_zh: "上海奢旅私域礼宾一组（欧洲/北欧线）",
      team_en: "Shanghai Luxury Concierge Team A (EUR/NORD)",
      assigned_leads: 620,
      engaged: 508,
      itinerary_quoted: 326,
      deposit_locked: 182,
      final_paid_nor: 164,
      avg_resp_sec: 34,
      qa_pass_pct: 99.2,
      bottleneck_zh: "定金锁位转化率 55.8%（标杆组）",
      bottleneck_en: "55.8% Quote-to-Lock (Benchmark)"
    },
    {
      team_id: "CONCIERGE-BJ-VIP",
      team_zh: "北京高定买手礼宾二组（地中海/英伦线）",
      team_en: "Beijing Couture Buyer Concierge B (MED/GBR)",
      assigned_leads: 540,
      engaged: 422,
      itinerary_quoted: 262,
      deposit_locked: 96,
      final_paid_nor: 84,
      avg_resp_sec: 138,
      qa_pass_pct: 91.8,
      bottleneck_zh: "方案报价→定金锁位流失 63.4%（首响偏慢 + 退税权益解释断层）",
      bottleneck_en: "63.4% Quote-to-Lock Drop (Slow SLA + Tax-Free Policy Friction)"
    },
    {
      team_id: "CONCIERGE-SZ-APAC",
      team_zh: "深圳跨境免税礼宾三组（日韩/亚太线）",
      team_en: "Shenzhen Duty-Free Concierge C (JPN/APAC)",
      assigned_leads: 590,
      engaged: 478,
      itinerary_quoted: 304,
      deposit_locked: 148,
      final_paid_nor: 132,
      avg_resp_sec: 46,
      qa_pass_pct: 96.6,
      bottleneck_zh: "银座免税预约连带率高，临期团需非降价礼遇包助推",
      bottleneck_en: "High Ginza VIP Attach; Needs Non-Discount Bundle for T-28"
    }
  ];

  const GENIE_SCENARIOS = [
    {
      id: "s3_nor_erosion",
      badge_zh: "场景 3 · 财务 NOR 侵蚀归因",
      badge_en: "Scenario 3 · Financial NOR Erosion",
      question_zh: "为什么 GTR-EUR-202609（瑞士巴黎免税臻选10日）配额去化率高达 96.7%，净营收利润率却只有 66.53%？把四项扣减拆出来对比。",
      question_en: "Why does GTR-EUR-202609 have a 96.7% quota sell-through rate but only a 66.53% NOR margin? Break down all four deduction buckets.",
      sql: `SELECT package_id, package_name,\n       ROUND(sell_through_rate * 100, 1) AS sell_through_pct,\n       gross_package_cny + dutyfree_addon_cny AS total_gross_cny,\n       tax_refund_deduction_cny, channel_rebate_cny,\n       promo_offset_cny, refund_claim_cny,\n       net_operating_revenue_cny, nor_margin_pct\nFROM travel_retail_ops.dws.dws_package_nor_summary\nWHERE package_id = 'GTR-EUR-202609';`,
      insight_zh: "Genie 基于 Unity Catalog Metric View (mv_travel_retail_nor) 秒级穿透：GTR-EUR-202609 含税总营收 ¥1,348.0万（基础旅购净额 ¥640.5万 + 免税精品净分成 ¥256.3万 = 全域 NOR ¥896.8万），但【外部旅行社阶梯返佣 ¥209.5万】+【跨境退税代扣 ¥108.5万】+【退改签赔付 ¥79.2万】+【促销抵扣券 ¥54.0万】合计扣减 ¥451.2万，导致 NOR 净利率被压缩至 66.53%（低于历史同线基准 79.4%）。建议下调外部高返佣分销配额占比，切换企微黑卡私域礼宾直客锁位。",
      insight_en: "Genie drills through Unity Catalog Metric View (mv_travel_retail_nor): GTR-EUR-202609 generated ¥13.48M gross (¥6.405M core travel NOR + ¥2.563M duty-free retail share = ¥8.968M total NOR), but external tiered agency rebates (¥2.095M), cross-border tax-refund withholding (¥1.085M), cancellation/service claims (¥0.792M), and promo vouchers (¥0.54M) deducted ¥4.512M, compressing NOR margin to 66.53% vs. the 79.4% benchmark.",
      columns_zh: ["套餐批次", "配额去化率", "含税总营收", "退税代扣+返佣", "促销+退改扣减", "全域净营收 NOR", "NOR 净利率"],
      columns_en: ["Package ID", "Sell-Through", "Total Gross", "Tax + Rebate", "Promo + Claims", "Total Net NOR", "NOR Margin"],
      rows: [
        ["GTR-EUR-202609", "96.7%", "¥1,348.0万", "-¥318.0万", "-¥133.2万", "¥896.8万", "66.53% (预警)"],
        ["同线历史均值 (EUR Benchmark)", "92.5%", "¥1,290.0万", "-¥198.0万", "-¥67.7万", "¥1,024.3万", "79.40% (健康)"]
      ]
    },
    {
      id: "s3_channel_illusion",
      badge_zh: "场景 3 · 渠道真假 ROI 审计",
      badge_en: "Scenario 3 · Gross GMV vs Net NOR ROI",
      question_zh: "对比短视频达人免税直播间与企微黑卡私域转介绍的账面 GMV ROI 和扣除退订/返佣后的净营收 (NOR) ROI。",
      question_en: "Compare Short-Video KOL Duty-Free Livestream vs WeCom Black-Card Concierge Referral on Gross GMV ROI vs Net NOR ROI after refunds and rebates.",
      sql: `SELECT channel_name, ad_spend_cny, gross_gmv_cny,\n       ROUND(gross_gmv_cny / ad_spend_cny, 2) AS gross_gmv_roi,\n       refund_rate_pct, net_nor_cny,\n       ROUND(net_nor_cny / ad_spend_cny, 2) AS net_nor_roi\nFROM travel_retail_ops.dws.dws_channel_roi_summary\nWHERE channel_code IN ('DOUYIN_LUX_LIVE', 'WECHAT_VIP_CLUB')\nORDER BY net_nor_roi DESC;`,
      insight_zh: "打破『直播间 GMV 虚胖幻觉』：短视频达人直播间账面 GMV 高达 ¥1,368万（Gross ROI 6.08x），但冲动锁单退订率高达 28.6% 且叠加坑位佣金，实际入账 NOR 仅 ¥428万（真实 Net NOR ROI 跌至 1.90x）；反观企微黑卡私域与礼宾转介绍退订率仅 3.1%，真实 Net NOR ROI 高达 19.90x（为直播间的 10.5 倍）。",
      insight_en: "Eliminating the 'GMV Illusion': Short-Video KOL Livestream posts ¥13.68M Gross GMV (6.08x Gross ROI), yet a 28.6% impulse cancellation rate and slot fees slash Net NOR to ¥4.28M (1.90x Net NOR ROI). WeCom Black-Card Concierge & Referral maintains a 3.1% refund rate and achieves 19.90x Net NOR ROI (10.5x higher capital efficiency).",
      columns_zh: ["投放渠道", "投放费用", "账面 GMV (Gross ROI)", "退订率", "真实净营收 NOR", "真实 Net NOR ROI"],
      columns_en: ["Channel", "Spend", "Gross GMV (ROI)", "Refund %", "Realized Net NOR", "Net NOR ROI"],
      rows: [
        ["企微黑卡私域与礼宾转介绍", "¥58.0万", "¥1,298万 (22.38x)", "3.1%", "¥1,154.0万", "19.90x (冠军)"],
        ["短视频达人免税专场直播间", "¥225.0万", "¥1,368万 (6.08x)", "28.6%", "¥428.0万", "1.90x (虚胖预警)"]
      ]
    },
    {
      id: "s4_funnel_bottleneck",
      badge_zh: "场景 4 · 私域礼宾漏斗卡点诊断",
      badge_en: "Scenario 4 · Concierge Funnel Bottleneck",
      question_zh: "过去 14 天哪个私域礼宾小组在『方案报价→定金锁位』环节流失最严重？与首响时长及免税权益合规得分有什么关系？",
      question_en: "Which private concierge team had the steepest 'Itinerary Quoted -> Deposit Locked' drop-off over the past 14 days, and how does it correlate with SLA response time?",
      sql: `SELECT team_id, team_name, itinerary_quoted, deposit_locked,\n       ROUND((1 - deposit_locked * 1.0 / itinerary_quoted) * 100, 1) AS quote_to_lock_drop_pct,\n       avg_first_response_sec, qa_compliance_pct\nFROM travel_retail_ops.dws.dws_cs_funnel_agent_daily\nORDER BY quote_to_lock_drop_pct DESC;`,
      insight_zh: "精准定位礼宾运营卡点：北京高定买手礼宾二组（CONCIERGE-BJ-VIP）在发送行程与免税礼遇报价后，定金锁位流失率高达 63.4%（上海标杆一组仅流失 44.2%）。根因交叉归因：① 高峰期平均首响 138 秒（超 60 秒黄金窗口）；② 38% 未锁单会话卡在『海关退税封顶规则与签证拒签退改保障』未一次性讲清。",
      insight_en: "Pinpointing operational friction: Beijing Couture Buyer Concierge Team B (CONCIERGE-BJ-VIP) suffers a 63.4% drop-off from Itinerary Quoted to Deposit Locked (vs. 44.2% in Shanghai Benchmark Team A), driven by 138s average first-response latency and unclear explanations of customs tax-refund caps and visa protection terms.",
      columns_zh: ["私域礼宾组", "方案报价数", "定金锁位数", "报价→锁位流失率", "平均首响", "智能质检合规率"],
      columns_en: ["Concierge Team", "Quoted", "Deposit Locked", "Quote->Lock Drop", "Avg First Resp", "QA Compliance"],
      rows: [
        ["北京高定买手礼宾二组 (BJ-VIP)", "262", "96", "63.4% (异常卡点)", "138s", "91.8%"],
        ["深圳跨境免税礼宾三组 (SZ-APAC)", "304", "148", "51.3% (正常)", "46s", "96.6%"],
        ["上海奢旅私域礼宾一组 (SH-LUX)", "326", "182", "44.2% (标杆)", "34s", "99.2%"]
      ]
    },
    {
      id: "s4_high_intent_cohort",
      badge_zh: "场景 4 · 伪匿名高潜未锁位客群圈选",
      badge_en: "Scenario 4 · Pseudonymous High-Intent Cohort",
      question_zh: "筛选近 7 天咨询过北海道银座线（GTR-JPN-202612）2 次以上、浏览过银座免税贵宾权益但尚未锁位的 GTR_OID_* 高潜令牌。",
      question_en: "List pseudonymous GTR_OID_* tokens who inquired 2+ times about Hokkaido & Ginza (GTR-JPN-202612) in the last 7 days, viewed Ginza VIP duty-free perks, and haven't locked deposits.",
      sql: `SELECT gtr_oid_token, intent_score, touch_count_7d,\n       preferred_suite_tier, key_hesitation_tag, source_channel\nFROM travel_retail_ops.dwd.dwd_concierge_high_intent_pool\nWHERE target_package_id = 'GTR-JPN-202612'\n  AND order_status = 'UNPAID_QUOTED'\n  AND touch_count_7d >= 2\nORDER BY intent_score DESC LIMIT 5;`,
      insight_zh: "合规闭环亮点：Databricks 湖仓全程仅处理源端跨境网关 HMAC-SHA256 生成的伪匿名令牌 `GTR_OID_*`（零姓名、零手机号、零护照号明文入湖）。圈选出的高潜令牌通过加密 Webhook 回推至境内私域 CRM 工作台，在源端完成 1 对 1 实名坐席派单。",
      insight_en: "Privacy-by-design closed loop: Databricks Lakehouse processes only HMAC-SHA256 pseudonymous `GTR_OID_*` tokens generated at the regional source gateway (zero plaintext name, phone, or passport PII in the cloud). Selected tokens are dispatched back to the domestic CRM workbench for 1-to-1 concierge follow-up.",
      columns_zh: ["伪匿名客户令牌 (GTR_OID)", "意向分", "7日触达", "偏好房型与免税档", "核心犹豫点标签", "来源渠道"],
      columns_en: ["Pseudonymous Token", "Intent", "7d Touches", "Preferred Tier", "Hesitation Tag", "Channel"],
      rows: [
        ["GTR_OID_9A41C3", "95", "4 次", "二世谷私汤套房 + 银座黑卡", "关注退税额度与私汤排期", "企微黑卡私域"],
        ["GTR_OID_2E88F4", "92", "3 次", "双卧雪景连通房 (家庭4人)", "比价是否含银座专车接驳", "小红书买手种草"],
        ["GTR_OID_7D10A8", "89", "3 次", "全景温泉套房", "担心航班延误退改签条款", "航司贵宾厅联名"],
        ["GTR_OID_5C92E6", "87", "2 次", "行政雪景大床房", "询问高端腕表免税配货礼遇", "企微礼宾转介绍"]
      ]
    }
  ];

  const QA_AUDITS = [
    {
      conv_id: "CONV-2026-8801",
      agent_code: "CONC-BJ-014",
      gtr_oid: "GTR_OID_8F3A92",
      package_id: "GTR-JPN-202612",
      channel_zh: "企微私域礼宾会话",
      channel_en: "WeCom Private Concierge",
      score: 54,
      risk_level: "HIGH",
      violation_zh: "违规承诺未授权保价退差与额外免税返现",
      violation_en: "Unauthorized Price-Match & Extra Tax-Rebate Promise",
      excerpt_zh: "客户：「如果下个月双十二北海道银座团降价或者免税店汇率更划算能退差价吗？」 顾问：「您今天先锁位，后面要是有任何促销降价或汇率差，我个人帮您申请全额退差价再多返 5% 免税津贴！」",
      excerpt_en: "Guest: 'If the Hokkaido & Ginza package drops price next month, will you refund the difference?' Concierge: 'Lock your deposit today—if any promo or FX gap appears, I personally guarantee a full price-match refund plus an extra 5% tax-free rebate!'",
      remediation_zh: "触发 HIGH 级合规熔断：严禁口头承诺未授权全额退差及固定比例返现；已自动推送主管复核并切换标准『早鸟锁位赠银座贵宾礼遇包』合规话术。",
      remediation_en: "HIGH compliance alert triggered: verbal price-match and extra cash-rebate promises are prohibited. Escalated to supervisor with approved 'Early-Lock Ginza VIP Value Bundle' script."
    },
    {
      conv_id: "CONV-2026-8802",
      agent_code: "CONC-BJ-019",
      gtr_oid: "GTR_OID_4C19B7",
      package_id: "GTR-EUR-202609",
      channel_zh: "400 奢旅贵宾专线 ASR 转写",
      channel_en: "400 VIP Hotline ASR",
      score: 61,
      risk_level: "HIGH",
      violation_zh: "跨境海关退税免审口头误导 + 退改签阶梯扣费漏报",
      violation_en: "Customs Tax-Refund Misstatement + Omitted Cancellation Tier",
      excerpt_zh: "客户：「巴黎买的腕表回程机场来不及盖章也能全额退税吗？出发前10天改期扣钱吗？」 顾问：「我们有贵宾通道肯定能退下来，改期基本没什么手续费的。」",
      excerpt_en: "Guest: 'Can I still get full VAT refund if I miss airport customs stamping in Paris? Any fee to reschedule 10 days out?' Concierge: 'Our VIP lane guarantees the refund, and rescheduling basically has no fee.'",
      remediation_zh: "触发 HIGH 级法务风控告警：欧盟海关退税必须本人持物核验盖章，且 T-14 内改期涉国际航司与酒店阶梯损费；须在 2 小时内回访补发书面条款确认函。",
      remediation_en: "HIGH legal risk: EU VAT refunds legally require in-person customs validation, and T-14 changes incur tiered carrier/hotel fees. Mandatory written policy clarification within 2h."
    },
    {
      conv_id: "CONV-2026-8803",
      agent_code: "CONC-SZ-008",
      gtr_oid: "GTR_OID_9A41C3",
      package_id: "GTR-JPN-202612",
      channel_zh: "企微私域礼宾会话",
      channel_en: "WeCom Private Concierge",
      score: 76,
      risk_level: "MEDIUM",
      violation_zh: "高潜二世谷私汤客群未执行 24h 跟进锁位动作",
      violation_en: "Missed 24h Lock Follow-up on High-Intent Niseko Suite Lead",
      excerpt_zh: "客户已确认出发日期并询问银座免税专车与私汤连通房余位，顾问仅发送通用 PDF 手册，超过 28 小时未发起定金锁位邀约。",
      excerpt_en: "Guest confirmed travel dates and asked about Ginza private transfer & Niseko connecting suite availability; concierge sent generic PDF brochure with no deposit-lock follow-up for 28h.",
      remediation_zh: "自动注入 CRM 督办工单：附带 GTR-JPN-202612 银座贵宾礼遇包专属权益码，提醒顾问 30 分钟内触达。",
      remediation_en: "Auto-created CRM coaching task with GTR-JPN-202612 Ginza VIP Bundle code for immediate 30-min callback."
    },
    {
      conv_id: "CONV-2026-8804",
      agent_code: "CONC-SH-003",
      gtr_oid: "GTR_OID_2E88F4",
      package_id: "GTR-MED-202610",
      channel_zh: "企微黑卡礼宾视频讲解",
      channel_en: "WeCom Black-Card Video Consult",
      score: 98,
      risk_level: "PASS",
      violation_zh: "全项合规 · 精准化解比价异议并锁单米兰买手团",
      violation_en: "Full Compliance · High-Value Milan Couture Lock",
      excerpt_zh: "清晰说明欧盟阶梯退税实操、T-30/T-15 退改签透明规则，用『蒙特拿破仑私人买手预约 + 庄园晚宴』替代现金折扣，当场完成 4 人定金锁位（NOR ¥19.8万）。",
      excerpt_en: "Clearly explained EU VAT refund rules and T-30/T-15 cancellation tiers; anchored Quadrilatero private buyer appointment + estate dinner instead of price cuts, locking 4 seats (¥198K NOR).",
      remediation_zh: "已自动收录至《寰宇旅购金牌私域礼宾话术库》作为全员示范样本。",
      remediation_en: "Indexed into 'Aether Gold-Standard Concierge Playbook' as a model case."
    },
    {
      conv_id: "CONV-2026-8805",
      agent_code: "CONC-SH-011",
      gtr_oid: "GTR_OID_5C92E6",
      package_id: "GTR-NORD-202611",
      channel_zh: "400 奢旅贵宾专线 ASR 转写",
      channel_en: "400 VIP Hotline ASR",
      score: 95,
      risk_level: "PASS",
      violation_zh: "全项合规 · 申根签拒签保障条款披露完整",
      violation_en: "Full Compliance · Complete Visa Protection Disclosure",
      excerpt_zh: "首响 26 秒，逐条核对申根签材料清单、极光玻璃屋房型差价及哥本哈根皇家免税贵宾折上礼遇，客户满意度 5 星。",
      excerpt_en: "26s response; verified Schengen checklist, glass-igloo tier pricing, and Copenhagen Royal Duty-Free VIP privileges with 5-star CSAT.",
      remediation_zh: "无需人工介入，质检自动归档通过。",
      remediation_en: "Auto-approved and archived with zero manual review needed."
    },
    {
      conv_id: "CONV-2026-8806",
      agent_code: "CONC-SZ-015",
      gtr_oid: "GTR_OID_6B30D9",
      package_id: "GTR-GBR-202612",
      channel_zh: "小红书私信转企微礼宾",
      channel_en: "RED DM to WeCom Concierge",
      score: 79,
      risk_level: "MEDIUM",
      violation_zh: "伦敦百货免税合作品牌退税服务费口径表述模糊",
      violation_en: "Ambiguous UK Tax-Free Handling Fee Explanation",
      excerpt_zh: "介绍骑士桥百货专属礼宾购物时，未明确区分商场尊享积分返礼与法定退税政策的差异，易引发后续客诉。",
      excerpt_en: "Did not clearly distinguish Knightsbridge store loyalty reward credits from statutory VAT rules during luxury shopping consult.",
      remediation_zh: "推送英伦旅购线最新免税合作权益卡片，要求补充书面说明。",
      remediation_en: "Pushed updated Britain Luxury Line shopping privilege card for written follow-up."
    }
  ];

  const PROMO_SUPERVISOR = {
    package_id: "GTR-JPN-202612",
    package_zh: "北海道粉雪私汤与银座免税臻选9日 (2026-12-12 出发 · T-28)",
    package_en: "Hokkaido Powder & Ginza Tax-Free 9D (Departs 2026-12-12 · T-28)",
    quota_total: 160,
    sold_units: 95,
    unsold_units: 65,
    rack_price: 38800,
    nor_floor: 29500,
    channel_tax_rate: 0.088,
    strategies: {
      ai_value_bundle: {
        label_zh: "AI 推荐：保价赠『银座黑卡免税礼遇 + 二世谷私汤专车包』（0 现金直降）",
        label_en: "AI Recommended: Hold Rack Price + Ginza VIP Tax-Free & Niseko Chauffeur Bundle (0 Cash Cut)",
        cash_discount_pct: 0,
        gift_face_value_cny: 4600,
        gift_internal_cost_cny: 860,
        projected_extra_units: 40,
        cohort_tokens: ["GTR_OID_9A41C3", "GTR_OID_2E88F4", "GTR_OID_7D10A8", "GTR_OID_5C92E6", "GTR_OID_3F77B1", "GTR_OID_8C24D5"],
        scripts_zh: [
          "【价格锚定不破价】维持 ¥38,800 官方臻选价，严守老客保价口碑与高定品牌调性，杜绝退差价连锁损耗。",
          "【高感知低边际成本礼遇】限时加赠价值 ¥4,600『银座旗舰免税店 1v1 中文买手导购 + ¥2,000 免税臻选礼金 + 新千岁至二世谷阿尔法专车接驳』（内部集团协议采购成本仅 ¥860/人）。",
          "【单客净营收测算】扣除跨境退税代扣/渠道结算费率 (8.8%) 与礼遇包内部成本后，预计单客净营收 NOR = ¥34,517.32，高于保本红线 (¥29,500) +¥5,017.32 安全垫！",
          "【增量净营收闭环】定向触达 65 席未锁位池中的高潜伪匿名客群，预计转化 40 席，直接创造 +¥138.07万 全域增量 NOR。"
        ],
        scripts_en: [
          "[Brand Integrity] Holds ¥38,800 rack price with 0% cash cut—protecting early-booker trust and luxury positioning.",
          "[High Perceived Value, Low Cost] Bundles a ¥4,600 perceived-value 'Ginza Flagship 1-on-1 Personal Shopper + ¥2,000 Tax-Free Privilege Credit + Niseko Alphard Chauffeur Transfer' (internal contracted cost: only ¥860/guest).",
          "[Unit Economics] Projected Net NOR = ¥34,517.32/guest after 8.8% settlement deductions and ¥860 gift cost—clearing the ¥29,500 NOR floor by +¥5,017.32!",
          "[Incremental NOR] Targets high-intent pseudonymous GTR_OID_* leads, converting ~40 seats for +¥1.38M incremental Net NOR."
        ]
      },
      gentle_early_lock: {
        label_zh: "保守对照：95 折限时锁位礼金 + 银座贵宾休息室（5% 现金让利）",
        label_en: "Moderate Control: 5% Deposit Rebate + Ginza VIP Lounge Access",
        cash_discount_pct: 5,
        gift_face_value_cny: 1500,
        gift_internal_cost_cny: 380,
        projected_extra_units: 30,
        cohort_tokens: ["GTR_OID_9A41C3", "GTR_OID_2E88F4", "GTR_OID_7D10A8", "GTR_OID_5C92E6"],
        scripts_zh: [
          "给予 5% 限时定金立减（折后 ¥36,860），单客预计 NOR ¥33,236.32，虽高于 ¥29,500 红线，但会对已锁位 95 席正价老客产生议价压力。",
          "增量净营收约 +¥99.71万，整体净利贡献比『AI 零降价银座免税礼遇包』少赚 ¥38.36万。"
        ],
        scripts_en: [
          "Applies 5% cash discount (¥36,860 effective), yielding ¥33,236.32 Net NOR/guest—above floor, but risks price-match friction with 95 existing full-fare guests.",
          "Generates +¥0.997M incremental NOR—¥383.6K less net profit than the AI zero-discount Ginza VIP value bundle."
        ]
      },
      blind_slash_22: {
        label_zh: "反面警示：传统临期粗放 78 折清尾甩卖（22% 现金直降 — 触发红线熔断！）",
        label_en: "Anti-Pattern: Legacy 22% Panic Cash Slash (Triggers NOR Floor Block!)",
        cash_discount_pct: 22,
        gift_face_value_cny: 0,
        gift_internal_cost_cny: 0,
        projected_extra_units: 52,
        cohort_tokens: ["BLOCKED_BY_NOR_GUARDRAIL"],
        scripts_zh: [
          "【红线熔断拦截】78 折粗放降价后账面客单跌至 ¥30,264，扣除 8.8% 跨境结算与退税代扣损耗后，单客净营收 NOR 跌至 ¥27,600.77 —— 击穿 ¥29,500 保本红线（每卖一席倒亏 ¥1,899.23 净利缺口）！",
          "【连锁退订灾难】还将诱发已付全款老客集中退订重拍或索赔退差，Agent Bricks 自动拒绝签发该促销单并锁定审批流。"
        ],
        scripts_en: [
          "[GUARDRAIL BLOCKED] 22% cash cut drops gross fare to ¥30,264 and Net NOR to ¥27,600.77/guest—breaching the ¥29,500 breakeven floor (-¥1,899.23 below floor per guest)!",
          "[Brand Erosion] Triggers rebooking/refund churn among 95 existing full-fare guests. Agent Bricks automatically blocks campaign execution."
        ]
      }
    }
  };

  // =========================================================================
  // 2. VIDEO CHAPTERS (5 REAL 1080p MP4 RECORDINGS)
  // =========================================================================
  const VIDEO_CHAPTERS = [
    {
      id: "ch0",
      src: "videos/ch0-full-walkthrough.mp4",
      duration: "03:49",
      badge_zh: "全程总览 · 03:49",
      badge_en: "Full Walkthrough · 03:49",
      title_zh: "全景实机走查：寰宇旅购 Lakehouse + AI/BI + Genie + Agent Bricks 闭环",
      title_en: "Full Live Walkthrough: Aether Travel & Retail Lakehouse + AI/BI + Genie + Agent Bricks",
      desc_zh: "一镜到底实机录制：串联 travel_retail_ops 湖仓目录、全域净营收 (NOR) 与全渠道净 ROI 双看板、Genie 自然语言穿透问数，以及私域礼宾质检与临期配额促收督导双 Agent。",
      desc_en: "End-to-end 1080p capture walking through travel_retail_ops Unity Catalog, Global NOR & Net ROI AI/BI dashboards, Genie NL2SQL drilldowns, and both Agent Bricks workflows."
    },
    {
      id: "ch1",
      src: "videos/ch1-aibi-dashboards.mp4",
      duration: "00:52",
      badge_zh: "第 1 章 · 00:52",
      badge_en: "Chapter 1 · 00:52",
      title_zh: "场景 1 & 2：AI/BI 全域净营收 (NOR) 驾驶舱与全渠道净 ROI 归因看板",
      title_en: "Scenarios 1 & 2: AI/BI Global NOR Cockpit & Omnichannel Net ROI Dashboards",
      desc_zh: "展示 Databricks AI/BI 原生发布的管理层双看板：定位 GTR-EUR-202609 高售罄低净利症结，拆解短视频直播间 28.6% 退订率导致的 GMV 虚胖与企微黑卡私域 19.9x 净 ROI 对比。",
      desc_en: "Published Databricks AI/BI dashboards contrasting GTR-EUR-202609 NOR margin compression and exposing Short-Video Livestream's 28.6% refund erosion vs. WeCom VIP 19.9x Net ROI."
    },
    {
      id: "ch2",
      src: "videos/ch2-genie-nl2sql.mp4",
      duration: "00:55",
      badge_zh: "第 2 章 · 00:55",
      badge_en: "Chapter 2 · 00:55",
      title_zh: "场景 3 & 4：Genie 即席财务 NOR 问数与私域礼宾漏斗下钻",
      title_en: "Scenarios 3 & 4: Genie Conversational NOR Analytics & Concierge Funnel Drilldown",
      desc_zh: "业务高管直接用自然语言向 Genie 提问，自动绑定 mv_travel_retail_nor 语义度量视图生成精准 SQL，下钻四项扣减明细并圈选 GTR_OID_* 伪匿名高潜未锁位客群。",
      desc_en: "Natural-language queries in Databricks Genie grounded on mv_travel_retail_nor Metric View—breaking down deduction buckets and isolating pseudonymous GTR_OID_* high-intent cohorts."
    },
    {
      id: "ch3",
      src: "videos/ch3-agent-smart-qa.mp4",
      duration: "01:02",
      badge_zh: "第 3 章 · 01:02",
      badge_en: "Chapter 3 · 01:02",
      title_zh: "场景 5：Agent Bricks 100% 私域礼宾与客服会话智能质检",
      title_en: "Scenario 5: Agent Bricks 100% Concierge & Service Compliance QA",
      desc_zh: "调用 Unity Catalog 函数 inspect_service_conversation 全量扫描企微私域与 400 专线会话（如 CONV-2026-8801 / 8802），秒级拦截违规保价退差与海关退税误导承诺。",
      desc_en: "Invoking Unity Catalog function inspect_service_conversation across 100% of concierge transcripts (CONV-2026-8801 / 8802) to flag unauthorized price-match and customs VAT misstatements."
    },
    {
      id: "ch4",
      src: "videos/ch4-agent-promo-supervisor.mp4",
      duration: "01:00",
      badge_zh: "第 4 章 · 01:00",
      badge_en: "Chapter 4 · 01:00",
      title_zh: "场景 6：Agent Bricks 临期旅游零售配额动态促收督导闭环",
      title_en: "Scenario 6: Agent Bricks Near-Departure Quota Dynamic Promo Supervisor",
      desc_zh: "针对北海道银座线 GTR-JPN-202612（T-28 剩余 65 席），串联 calc_package_promo_bundle、select_high_intent_leads 与 run_inventory_promo_supervisor 生成银座免税礼遇包并回推 GTR_OID_* 令牌。",
      desc_en: "Running calc_package_promo_bundle + select_high_intent_leads + run_inventory_promo_supervisor on GTR-JPN-202612 (65 unsold seats at T-28) above the ¥29,500 NOR floor."
    }
  ];

  // =========================================================================
  // 3. STATE & HELPERS
  // =========================================================================
  const state = {
    activeSubtab: "s12",
    lineFilter: "ALL",
    selectedPackageId: "GTR-EUR-202609",
    selectedGenieId: "s3_nor_erosion",
    qaRiskFilter: "ALL",
    selectedConvId: "CONV-2026-8801",
    selectedPromoStrategy: "ai_value_bundle",
    activeVideoId: "ch0"
  };

  const liveState = {
    unlocked: false,
    busy: false,
    errorMsg: "",
    infoMsg: "",
    manifest: null,
    remember: true,
    showPasscode: false,
    authMode: "corp_b2b",
    activeEmbedKey: "norEmbed",
    embedMounted: false,
    probes: {
      oidc: { status: "idle", ms: null, detail: "" },
      aadAuth: { status: "idle", ms: null, detail: "" },
      embedPing: { status: "idle", ms: null, detail: "" }
    }
  };

  function t(zhStr, enStr) {
    return lang === "zh" ? zhStr : enStr;
  }

  function fmtWan(val) {
    const wan = val / 10000;
    return lang === "zh"
      ? `¥${wan.toLocaleString("zh-CN", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}万`
      : `¥${(val / 1000000).toFixed(2)}M`;
  }

  function fmtCny(val) {
    return `¥${Math.round(val).toLocaleString("en-US")}`;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function b64ToBytes(b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function bytesToB64(bytes) {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  // =========================================================================
  // 4. WEBCRYPTO PBKDF2-SHA256 + AES-256-GCM & BASE64 SSO URL BUILDER
  // =========================================================================
  async function encryptManifestBundle(passcode, manifestObj) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(passcode),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const aesKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 210000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const ptBytes = enc.encode(JSON.stringify(manifestObj));
    const ctBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, aesKey, ptBytes);
    return {
      kdf: "PBKDF2-SHA256",
      iterations: 210000,
      cipher: "AES-256-GCM",
      saltB64: bytesToB64(salt),
      ivB64: bytesToB64(iv),
      ctB64: bytesToB64(new Uint8Array(ctBuf))
    };
  }

  async function decryptManifestBundle(passcode, bundle) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("WebCrypto API unavailable in this browser context.");
    }
    const enc = new TextEncoder();
    const salt = b64ToBytes(bundle.saltB64 || bundle.salt);
    const iv = b64ToBytes(bundle.ivB64 || bundle.iv);
    const ct = b64ToBytes(bundle.ctB64 || bundle.ct);
    const iterations = bundle.iterations || bundle.iter || 210000;

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(passcode),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const aesKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: iterations,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, aesKey, ct);
    const jsonText = new TextDecoder().decode(plainBuf);
    return JSON.parse(jsonText);
  }

  async function decryptLiveOrFixture(passcode) {
    const trimmed = String(passcode || "").trim();
    if (!trimmed) {
      throw new Error(t("请输入演示通行口令。", "Please enter the live demo passcode."));
    }
    try {
      return await decryptManifestBundle(trimmed, LIVE_BUNDLE);
    } catch (_err) {
      if (trimmed === "unit-test-fixture-only") {
        const tempBundle = await encryptManifestBundle(trimmed, SAMPLE_FIXTURE_MANIFEST);
        return await decryptManifestBundle(trimmed, tempBundle);
      }
      throw new Error(
        t(
          "口令校验未通过（PBKDF2-SHA256 + AES-256-GCM 解密失败），请核对演示口令后重试。",
          "Passcode verification failed (PBKDF2-SHA256 + AES-256-GCM auth tag mismatch). Please check your passcode."
        )
      );
    }
  }

  // Databricks /aad/auth requires next_url to be Base64-encoded (matching window.btoa on UTF-8 bytes);
  // passing a raw path triggers HTTP 400 Invalid State on callback.
  function encodeAadNextUrl(routePath) {
    const normalized = String(routePath || "/").startsWith("/") ? String(routePath) : `/${routePath}`;
    const utf8Bytes = new TextEncoder().encode(normalized);
    let binary = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return encodeURIComponent(btoa(binary));
  }

  function resolveAdminHints(manifest) {
    const adminHint = (manifest && (manifest.tenantAdminHint || manifest.adminLoginHint)) || "";
    const adminDomain =
      (manifest && (manifest.adminDomainHint || manifest.tenantDomain)) ||
      (adminHint.indexOf("@") !== -1 ? adminHint.split("@")[1] : "");
    return { adminHint, adminDomain };
  }

  function buildLaunchUrl(manifest, routePath, authMode) {
    if (!manifest) return "#act-live";
    const host = String(manifest.workspaceHost || "").replace(/\/$/, "");
    const cleanRoute = String(routePath || "/").startsWith("/") ? String(routePath) : `/${routePath}`;
    const mode = authMode || liveState.authMode || "corp_b2b";
    const encodedNext = encodeAadNextUrl(cleanRoute);

    if (mode === "corp_b2b") {
      const hint = encodeURIComponent(manifest.corpLoginHint || "");
      const domain = encodeURIComponent(manifest.corpDomainHint || "microsoft.com");
      return `${host}/aad/auth?hash=&next_url=${encodedNext}&o=${encodeURIComponent(manifest.orgId)}&login_hint=${hint}&domain_hint=${domain}`;
    }
    if (mode === "tenant_admin") {
      const { adminHint, adminDomain } = resolveAdminHints(manifest);
      return `${host}/aad/auth?hash=&next_url=${encodedNext}&o=${encodeURIComponent(manifest.orgId)}&login_hint=${encodeURIComponent(adminHint)}&domain_hint=${encodeURIComponent(adminDomain)}`;
    }
    return `${host}${cleanRoute}`;
  }

  function buildEmbedUrl(manifest, embedKey) {
    if (!manifest || !manifest.routes) return "";
    const host = String(manifest.workspaceHost || "").replace(/\/$/, "");
    const route = manifest.routes[embedKey] || manifest.routes.norEmbed;
    return `${host}${route}`;
  }

  function buildProtocolUrl(_manifest, targetKey) {
    return `zava-demo://launch?target=${encodeURIComponent(targetKey || "gtr-all")}`;
  }

  function saveCachedSession(manifest) {
    try {
      const payload = {
        savedAt: Date.now(),
        expiresAt: Date.now() + TTL_MS,
        authMode: liveState.authMode,
        manifest: manifest
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_e) {
      // Ignore storage quota / private mode restrictions
    }
  }

  function loadCachedSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.manifest || !parsed.expiresAt || Date.now() > parsed.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch (_e) {
      return null;
    }
  }

  function clearCachedSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_e) {
      // Ignore
    }
  }

  // =========================================================================
  // 5. SILENT PRE-FLIGHT CONNECTIVITY PROBES (CSP-SAFE)
  // =========================================================================
  async function runLiveProbes() {
    const m = liveState.manifest;
    if (!m) return;

    liveState.probes.oidc = { status: "checking", ms: null, detail: t("正在探测 Entra ID OIDC 元数据…", "Probing Entra ID OIDC metadata…") };
    liveState.probes.aadAuth = { status: "checking", ms: null, detail: t("正在探测 Databricks /aad/auth 网关…", "Probing Databricks /aad/auth gateway…") };
    liveState.probes.embedPing = { status: "checking", ms: null, detail: t("正在探测 AI/BI 看板发布端点…", "Probing AI/BI published endpoint…") };
    renderLiveGate();

    const { adminDomain } = resolveAdminHints(m);

    // Probe 1: Entra ID OpenID Configuration (CORS-enabled JSON endpoint)
    const t0 = performance.now();
    try {
      const oidcUrl = `https://login.microsoftonline.com/${encodeURIComponent(m.tenantId)}/v2.0/.well-known/openid-configuration`;
      const resp = await fetch(oidcUrl, { method: "GET", credentials: "omit", cache: "no-store" });
      const dt = Math.round(performance.now() - t0);
      if (resp.ok) {
        const data = await resp.json();
        liveState.probes.oidc = {
          status: "ok",
          ms: dt,
          detail: data && data.issuer ? t(`OIDC 就绪 (${dt} ms)`, `OIDC Ready (${dt} ms)`) : `HTTP ${resp.status} (${dt} ms)`
        };
      } else {
        liveState.probes.oidc = { status: "warn", ms: dt, detail: `HTTP ${resp.status} (${dt} ms)` };
      }
    } catch (_err) {
      const dt = Math.round(performance.now() - t0);
      liveState.probes.oidc = { status: "warn", ms: dt, detail: adminDomain || t("受网络策略限制，不影响点击跳转", "Direct jump unaffected") };
    }

    // Probe 2: Workspace /aad/auth no-cors reachability
    const t1 = performance.now();
    try {
      await fetch(`${m.workspaceHost.replace(/\/$/, "")}/aad/auth?o=${encodeURIComponent(m.orgId)}`, {
        method: "GET",
        mode: "no-cors",
        credentials: "omit",
        cache: "no-store"
      });
      const dt1 = Math.round(performance.now() - t1);
      liveState.probes.aadAuth = {
        status: "ok",
        ms: dt1,
        detail: t(`网关可达 (${dt1} ms · 零无痕直连)`, `Gateway Reachable (${dt1} ms)`)
      };
    } catch (_err) {
      const dt1 = Math.round(performance.now() - t1);
      liveState.probes.aadAuth = { status: "warn", ms: dt1, detail: t("待新标签页直连验证", "Verify via new tab") };
    }

    // Probe 3: Published Embed Endpoint no-cors reachability
    const t2 = performance.now();
    try {
      await fetch(buildEmbedUrl(m, "norEmbed"), {
        method: "GET",
        mode: "no-cors",
        credentials: "omit",
        cache: "no-store"
      });
      const dt2 = Math.round(performance.now() - t2);
      liveState.probes.embedPing = {
        status: "ok",
        ms: dt2,
        detail: t(`AI/BI 嵌入源就绪 (${dt2} ms)`, `AI/BI Embed Ready (${dt2} ms)`)
      };
    } catch (_err) {
      const dt2 = Math.round(performance.now() - t2);
      liveState.probes.embedPing = { status: "warn", ms: dt2, detail: t("完成一次 SSO 后即可内嵌渲染", "Mount after 1-click SSO") };
    }

    renderLiveGate();
  }

  // =========================================================================
  // 6. RENDER ACT 2: S1 & S2 (AI/BI NOR COCKPIT + CHANNEL NET ROI)
  // =========================================================================
  function renderPackageTable() {
    const tbody = document.getElementById("packageTableBody");
    if (!tbody) return;

    const rows = PACKAGES.filter((p) => state.lineFilter === "ALL" || p.line_code === state.lineFilter);
    tbody.innerHTML = rows
      .map((p) => {
        const isSel = p.package_id === state.selectedPackageId;
        const badgeCls =
          p.health_code === "HIGH_SELL_LOW_NOR"
            ? "tag-red"
            : p.health_code === "QUOTA_GAP_ALERT"
            ? "tag-amber"
            : "tag-green";
        const sellPct = `${(p.sell_through_rate * 100).toFixed(1)}%`;
        return `<tr class="clickable-row ${isSel ? "selected-row" : ""}" data-package-id="${escapeHtml(p.package_id)}">
          <td>
            <div class="mono" style="font-weight:700;">${escapeHtml(p.package_id)}</div>
            <div style="font-size:11.5px;color:var(--text-secondary);">${escapeHtml(t(p.name_zh, p.name_en))}</div>
            <div style="font-size:11px;color:var(--text-muted);">${escapeHtml(t(p.line_zh, p.line_en))} · T-${p.days_to_departure}</div>
          </td>
          <td class="num">${p.sold_units}/${p.quota_total} <span style="color:var(--text-muted);">(${sellPct})</span></td>
          <td class="num" style="font-weight:700;">${fmtWan(p.net_operating_revenue_cny)}</td>
          <td class="num" style="font-weight:700;color:${p.nor_margin_pct < 72 ? "var(--status-red)" : "var(--status-green)"};">${p.nor_margin_pct.toFixed(2)}%</td>
          <td><span class="pill-tag ${badgeCls}">${escapeHtml(t(p.health_zh, p.health_en))}</span></td>
        </tr>`;
      })
      .join("");

    tbody.querySelectorAll("tr[data-package-id]").forEach((tr) => {
      tr.addEventListener("click", () => {
        state.selectedPackageId = tr.getAttribute("data-package-id");
        renderPackageTable();
        renderNorWaterfall();
      });
    });
  }

  function renderNorWaterfall() {
    const container = document.getElementById("norWaterfallContainer");
    const titleEl = document.getElementById("norWaterfallTitle");
    const subEl = document.getElementById("norWaterfallSubtitle");
    if (!container) return;

    const p = PACKAGES.find((x) => x.package_id === state.selectedPackageId) || PACKAGES[0];
    const totalGross = p.gross_package_cny + p.dutyfree_addon_cny;

    if (titleEl) {
      titleEl.textContent = t(
        `${p.package_id} · 全域净营收 (NOR) 瀑布拆解`,
        `${p.package_id} · Global Net Operating Revenue (NOR) Waterfall`
      );
    }
    if (subEl) {
      subEl.textContent = t(
        `${p.name_zh} | 配额去化 ${(p.sell_through_rate * 100).toFixed(1)}% (${p.sold_units}/${p.quota_total}) · 基础旅购净额 ${fmtWan(p.core_tour_nor_cny)} + 免税精品分成 ${fmtWan(p.dutyfree_addon_cny)} = 全域 NOR ${fmtWan(p.net_operating_revenue_cny)} (${p.nor_margin_pct.toFixed(2)}%)`,
        `${p.name_en} | Quota Sell-Through ${(p.sell_through_rate * 100).toFixed(1)}% (${p.sold_units}/${p.quota_total}) · Core Tour NOR ${fmtWan(p.core_tour_nor_cny)} + Duty-Free Retail ${fmtWan(p.dutyfree_addon_cny)} = Total NOR ${fmtWan(p.net_operating_revenue_cny)} (${p.nor_margin_pct.toFixed(2)}%)`
      );
    }

    const steps = [
      {
        label: t("① 奢旅套餐含税总营收 (Gross Package)", "1. Gross Luxury Package Fare"),
        val: p.gross_package_cny,
        sign: "+",
        color: "var(--ocean-blue)"
      },
      {
        label: t("② 跨境免税精品连带分成 (Duty-Free Retail)", "2. Cross-Border Duty-Free Merchandising"),
        val: p.dutyfree_addon_cny,
        sign: "+",
        color: "var(--nordic-teal)"
      },
      {
        label: t("③ 扣：跨境退税代扣与清关损耗 (Tax Withholding)", "3. Less: Cross-Border Tax-Refund Withholding"),
        val: p.tax_refund_deduction_cny,
        sign: "-",
        color: "var(--status-amber)"
      },
      {
        label: t("④ 扣：外部旅行社/OTA 阶梯返佣 (Channel Rebate)", "4. Less: External Agency/OTA Tiered Rebates"),
        val: p.channel_rebate_cny,
        sign: "-",
        color: "var(--status-red)"
      },
      {
        label: t("⑤ 扣：会员礼金与促销抵扣券 (Promo Offset)", "5. Less: Member Voucher & Promo Offset"),
        val: p.promo_offset_cny,
        sign: "-",
        color: "var(--status-amber)"
      },
      {
        label: t("⑥ 扣：退改签损费与服务赔付 (Cancel/Claim)", "6. Less: Reschedule & Service Claims"),
        val: p.refund_claim_cny,
        sign: "-",
        color: "var(--status-red)"
      },
      {
        label: t("⑦ 最终入账全域净营收 (Realized Total NOR)", "7. Realized Total Net Operating Revenue (NOR)"),
        val: p.net_operating_revenue_cny,
        sign: "=",
        color: p.nor_margin_pct < 72 ? "var(--gtr-crimson)" : "var(--status-green)"
      }
    ];

    container.innerHTML = `<div class="waterfall-list">
      ${steps
        .map((s) => {
          const pct = Math.max(4, Math.min(100, (s.val / totalGross) * 100));
          const prefix = s.sign === "-" ? "-" : s.sign === "+" ? "+" : "";
          return `<div class="wf-row">
            <div class="wf-label">${escapeHtml(s.label)}</div>
            <div class="wf-track"><div class="wf-bar" style="width:${pct.toFixed(1)}%;background:${s.color};"></div></div>
            <div class="wf-val mono" style="color:${s.sign === "-" ? "var(--status-red)" : "var(--text-primary)"};">${prefix}${fmtWan(s.val)}</div>
          </div>`;
        })
        .join("")}
    </div>
    <div style="margin-top:12px;padding:10px 12px;border-radius:9px;background:var(--bg-elevated);font-size:12px;color:var(--text-secondary);">
      <strong>${escapeHtml(t("AI 财务经营诊断：", "AI Financial Diagnosis:"))}</strong>
      ${escapeHtml(
        p.health_code === "HIGH_SELL_LOW_NOR"
          ? t(
              "该团配额去化率高达 96.7%，但外部渠道阶梯返佣 (¥209.5万) + 退税代扣与退改赔付将 NOR 净利率拉低至 66.53%（低于同线基准 79.4%）。建议收紧外部高返佣分销配额，优先向企微黑卡私域礼宾池释放尾席。",
              "Quota sell-through is 96.7%, yet external tiered rebates (¥2.095M), tax withholding, and claims compress NOR margin to 66.53% vs. the 79.4% benchmark. Shift inventory allocation toward WeCom Black-Card Concierge direct sales."
            )
          : p.health_code === "QUOTA_GAP_ALERT"
          ? t(
              `距离出发仅剩 T-${p.days_to_departure} 天，尚有 ${p.unsold_units} 席高毛利配额待去化。点击上方切换至【场景 5 & 6：Agent 智能运营闭环】一键推演保价赠免税礼遇包促收方案（预计终局 NOR 可达 ${fmtWan(p.ai_forecast_final_nor_cny)}）。`,
              `T-${p.days_to_departure} days to departure with ${p.unsold_units} seats remaining. Switch to Scenarios 5 & 6 (Agent Operations) to simulate the zero-discount duty-free value bundle (forecast final NOR: ${fmtWan(p.ai_forecast_final_nor_cny)}).`
            )
          : t(
              `当前配额去化率 ${(p.sell_through_rate * 100).toFixed(1)}%，NOR 净利率 ${p.nor_margin_pct.toFixed(2)}% 高于历史同线基准 (${p.hist_benchmark_nor_margin_pct}%)，免税连带预约健康，维持私域礼宾标准跟进节奏。`,
              `Sell-through ${(p.sell_through_rate * 100).toFixed(1)}% with ${p.nor_margin_pct.toFixed(2)}% NOR margin beats the ${p.hist_benchmark_nor_margin_pct}% historical benchmark.`
            )
      )}
    </div>`;
  }

  function renderChannelRoi() {
    const container = document.getElementById("channelRoiContainer");
    if (!container) return;

    const maxRoi = 23;
    container.innerHTML = `<div class="roi-compare-list">
      ${CHANNELS.map((c) => {
        const grossW = Math.min(100, (c.gross_roi / maxRoi) * 100);
        const netW = Math.min(100, (c.net_nor_roi / maxRoi) * 100);
        const tagCls =
          c.verdict_code === "GMV_ILLUSION"
            ? "tag-red"
            : c.verdict_code === "REBATE_CAP"
            ? "tag-amber"
            : c.verdict_code === "SCALE_UP"
            ? "tag-green"
            : "tag-blue";
        return `<div class="roi-item">
          <div class="roi-item-head">
            <div>
              <strong>${escapeHtml(t(c.name_zh, c.name_en))}</strong>
              <span style="font-size:11.5px;color:var(--text-muted);margin-left:6px;">${escapeHtml(
                t(`投放 ${fmtWan(c.ad_spend_cny)} · 退订率 ${c.refund_rate_pct}%`, `Spend ${fmtWan(c.ad_spend_cny)} · Refund ${c.refund_rate_pct}%`)
              )}</span>
            </div>
            <span class="pill-tag ${tagCls}">${escapeHtml(t(c.verdict_zh, c.verdict_en))}</span>
          </div>
          <div class="roi-bars">
            <div class="roi-bar-line">
              <span style="color:var(--text-muted);">${escapeHtml(t("账面 GMV ROI", "Gross GMV ROI"))}</span>
              <div class="roi-bar-track"><div class="roi-bar-fill" style="width:${grossW.toFixed(1)}%;background:rgba(100,116,139,0.55);"></div></div>
              <span class="mono num">${c.gross_roi.toFixed(2)}x</span>
            </div>
            <div class="roi-bar-line">
              <span style="font-weight:700;">${escapeHtml(t("真实 NOR ROI", "Net NOR ROI"))}</span>
              <div class="roi-bar-track"><div class="roi-bar-fill" style="width:${netW.toFixed(1)}%;background:${
          c.verdict_code === "GMV_ILLUSION" ? "var(--status-red)" : "var(--status-green)"
        };"></div></div>
              <span class="mono num" style="font-weight:800;color:${
                c.verdict_code === "GMV_ILLUSION" ? "var(--status-red)" : "var(--status-green)"
              };">${c.net_nor_roi.toFixed(2)}x</span>
            </div>
          </div>
        </div>`;
      }).join("")}
    </div>`;
  }

  function renderCsFunnelTable() {
    const tbody = document.getElementById("csFunnelTableBody");
    if (!tbody) return;
    tbody.innerHTML = CS_FUNNEL_TEAMS.map((tm) => {
      const lockRate = ((tm.deposit_locked / tm.itinerary_quoted) * 100).toFixed(1);
      const isWarn = tm.avg_resp_sec > 90;
      return `<tr>
        <td><strong>${escapeHtml(t(tm.team_zh, tm.team_en))}</strong></td>
        <td class="num">${tm.assigned_leads} → ${tm.engaged} → ${tm.itinerary_quoted} → <strong>${tm.deposit_locked}</strong> → ${tm.final_paid_nor}</td>
        <td class="num" style="font-weight:700;color:${isWarn ? "var(--status-red)" : "var(--status-green)"};">${lockRate}%</td>
        <td class="num mono">${tm.avg_resp_sec}s</td>
        <td><span class="pill-tag ${isWarn ? "tag-red" : "tag-green"}">${escapeHtml(t(tm.bottleneck_zh, tm.bottleneck_en))}</span></td>
      </tr>`;
    }).join("");
  }

  // =========================================================================
  // 7. RENDER ACT 2: S3 & S4 (GENIE CONVERSATIONAL ANALYTICS)
  // =========================================================================
  function renderGenieWorkbench() {
    const promptGrid = document.getElementById("geniePromptGrid");
    const outputBox = document.getElementById("genieResponseContainer");
    if (!promptGrid || !outputBox) return;

    promptGrid.innerHTML = GENIE_SCENARIOS.map((g) => {
      const active = g.id === state.selectedGenieId;
      return `<button type="button" class="genie-q-btn ${active ? "active" : ""}" data-genie-id="${escapeHtml(g.id)}">
        <div style="margin-bottom:5px;"><span class="pill-tag tag-purple">${escapeHtml(t(g.badge_zh, g.badge_en))}</span></div>
        <div style="font-weight:700;">“${escapeHtml(t(g.question_zh, g.question_en))}”</div>
      </button>`;
    }).join("");

    promptGrid.querySelectorAll("button[data-genie-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedGenieId = btn.getAttribute("data-genie-id");
        renderGenieWorkbench();
      });
    });

    const cur = GENIE_SCENARIOS.find((x) => x.id === state.selectedGenieId) || GENIE_SCENARIOS[0];
    const cols = lang === "zh" ? cur.columns_zh : cur.columns_en;

    outputBox.innerHTML = `
      <div class="grid-2" style="margin-bottom:0;">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;">
            ${escapeHtml(t("Genie 自动生成并经 Unity Catalog 治理校验的 SQL：", "Genie Generated SQL (Governed by Unity Catalog Metric Views):"))}
          </div>
          <pre class="code-block">${escapeHtml(cur.sql)}</pre>
        </div>
        <div class="sim-panel">
          <div style="font-size:12.5px;font-weight:800;color:var(--gtr-crimson);margin-bottom:6px;">
            ${escapeHtml(t("Genie 经营归因结论与行动建议", "Genie Executive Insight & Recommended Action"))}
          </div>
          <p style="margin:0 0 12px;font-size:12.6px;color:var(--text-primary);">${escapeHtml(t(cur.insight_zh, cur.insight_en))}</p>
          <div class="table-wrap">
            <table>
              <thead><tr>${cols.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>
              <tbody>
                ${cur.rows
                  .map((r) => `<tr>${r.map((cell, idx) => `<td class="${idx > 0 ? "mono" : ""}">${escapeHtml(cell)}</td>`).join("")}</tr>`)
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  // =========================================================================
  // 8. RENDER ACT 2: S5 & S6 (AGENT BRICKS QA + PROMO SUPERVISOR)
  // =========================================================================
  function renderSmartQa() {
    const tbody = document.getElementById("qaTableBody");
    const detail = document.getElementById("qaDetailPanel");
    if (!tbody || !detail) return;

    const filtered = QA_AUDITS.filter((q) => state.qaRiskFilter === "ALL" || q.risk_level === state.qaRiskFilter);
    tbody.innerHTML = filtered
      .map((q) => {
        const isSel = q.conv_id === state.selectedConvId;
        const cls = q.risk_level === "HIGH" ? "tag-red" : q.risk_level === "MEDIUM" ? "tag-amber" : "tag-green";
        return `<tr class="clickable-row ${isSel ? "selected-row" : ""}" data-conv-id="${escapeHtml(q.conv_id)}">
          <td class="mono" style="font-weight:700;">${escapeHtml(q.conv_id)}</td>
          <td class="mono">${escapeHtml(q.gtr_oid)}</td>
          <td>${escapeHtml(t(q.channel_zh, q.channel_en))}</td>
          <td class="num mono" style="font-weight:800;">${q.score}</td>
          <td><span class="pill-tag ${cls}">${escapeHtml(q.risk_level)}</span></td>
          <td>${escapeHtml(t(q.violation_zh, q.violation_en))}</td>
        </tr>`;
      })
      .join("");

    tbody.querySelectorAll("tr[data-conv-id]").forEach((tr) => {
      tr.addEventListener("click", () => {
        state.selectedConvId = tr.getAttribute("data-conv-id");
        renderSmartQa();
      });
    });

    const cur = QA_AUDITS.find((x) => x.conv_id === state.selectedConvId) || filtered[0] || QA_AUDITS[0];
    const cls = cur.risk_level === "HIGH" ? "tag-red" : cur.risk_level === "MEDIUM" ? "tag-amber" : "tag-green";

    detail.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
        <div>
          <span class="mono" style="font-weight:800;">${escapeHtml(cur.conv_id)}</span>
          <span style="color:var(--text-muted);font-size:12px;margin-left:8px;">${escapeHtml(cur.agent_code)} · ${escapeHtml(cur.package_id)} · ${escapeHtml(cur.gtr_oid)}</span>
        </div>
        <span class="pill-tag ${cls}">${escapeHtml(cur.risk_level)} · ${cur.score}/100</span>
      </div>
      <div style="font-size:12.3px;padding:10px 12px;border-radius:8px;background:var(--bg-card);border:1px solid var(--border-subtle);margin-bottom:10px;">
        <strong>${escapeHtml(t("脱敏会话证据摘录：", "Pseudonymized Transcript Evidence:"))}</strong><br/>
        ${escapeHtml(t(cur.excerpt_zh, cur.excerpt_en))}
      </div>
      <div style="font-size:12.3px;color:var(--text-secondary);">
        <strong>${escapeHtml(t("Agent Bricks 处置与督导闭环 (inspect_service_conversation)：", "Agent Bricks Remediation (inspect_service_conversation):"))}</strong>
        ${escapeHtml(t(cur.remediation_zh, cur.remediation_en))}
      </div>`;
  }

  function renderPromoSupervisor() {
    const container = document.getElementById("promoSupervisorContainer");
    if (!container) return;

    const strat = PROMO_SUPERVISOR.strategies[state.selectedPromoStrategy] || PROMO_SUPERVISOR.strategies.ai_value_bundle;
    const effectiveGross = PROMO_SUPERVISOR.rack_price * (1 - strat.cash_discount_pct / 100);
    const channelAndTaxFee = effectiveGross * PROMO_SUPERVISOR.channel_tax_rate;
    const projectedUnitNor = effectiveGross - channelAndTaxFee - strat.gift_internal_cost_cny;
    const bufferVsFloor = projectedUnitNor - PROMO_SUPERVISOR.nor_floor;
    const passed = projectedUnitNor >= PROMO_SUPERVISOR.nor_floor;
    const incrementalNor = passed ? projectedUnitNor * strat.projected_extra_units : 0;

    container.innerHTML = `
      <div class="filter-bar" style="margin-bottom:12px;">
        <span style="font-size:12.5px;font-weight:700;">${escapeHtml(t("选择促收策略推演：", "Select Promo Strategy Simulation:"))}</span>
        ${Object.keys(PROMO_SUPERVISOR.strategies)
          .map((key) => {
            const item = PROMO_SUPERVISOR.strategies[key];
            return `<button type="button" class="filter-chip ${state.selectedPromoStrategy === key ? "active" : ""}" data-promo-key="${escapeHtml(key)}">
              ${escapeHtml(t(item.label_zh, item.label_en))}
            </button>`;
          })
          .join("")}
      </div>

      <div class="guardrail-meter">
        <div class="guardrail-stat">
          <div class="g-lbl">${escapeHtml(t("目标套餐正价 / 保本 NOR 红线", "Rack Fare / Breakeven NOR Floor"))}</div>
          <div class="g-val mono">${fmtCny(PROMO_SUPERVISOR.rack_price)} / <span style="color:var(--status-amber);">${fmtCny(PROMO_SUPERVISOR.nor_floor)}</span></div>
        </div>
        <div class="guardrail-stat">
          <div class="g-lbl">${escapeHtml(t("测算单客净营收 (Projected NOR)", "Projected Unit Net NOR"))}</div>
          <div class="g-val mono" style="color:${passed ? "var(--status-green)" : "var(--status-red)"};">${fmtCny(projectedUnitNor)}</div>
        </div>
        <div class="guardrail-stat">
          <div class="g-lbl">${escapeHtml(t("财务安全垫校验 (Guardrail)", "NOR Floor Safety Buffer"))}</div>
          <div class="g-val mono" style="color:${passed ? "var(--status-green)" : "var(--status-red)"};">
            ${bufferVsFloor >= 0 ? "+" : ""}${fmtCny(bufferVsFloor)} (${passed ? "PASS_GUARDRAIL" : "BLOCKED"})
          </div>
        </div>
        <div class="guardrail-stat">
          <div class="g-lbl">${escapeHtml(t("预计去化席位 / 增量净营收", "Projected Seats / Incremental NOR"))}</div>
          <div class="g-val mono" style="color:${passed ? "var(--ocean-blue)" : "var(--status-red)"};">
            ${passed ? `+${strat.projected_extra_units} ${t("席", "seats")} · +${fmtWan(incrementalNor)}` : t("熔断拦截 · 禁止外呼", "Blocked by Guardrail")}
          </div>
        </div>
      </div>

      <div class="sim-panel">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <strong>${escapeHtml(t(PROMO_SUPERVISOR.package_zh, PROMO_SUPERVISOR.package_en))}</strong>
          <span class="pill-tag ${passed ? "tag-green" : "tag-red"}">
            ${escapeHtml(
              passed
                ? t("calc_package_promo_bundle + run_inventory_promo_supervisor 审批通过", "calc_package_promo_bundle + run_inventory_promo_supervisor Approved")
                : t("NOR 保本红线熔断拦截 (Floor Guardrail Triggered)", "NOR Breakeven Guardrail Blocked")
            )}
          </span>
        </div>
        <ul class="script-list">
          ${(lang === "zh" ? strat.scripts_zh : strat.scripts_en).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
        <div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border-subtle);">
          <div style="font-size:12px;font-weight:700;color:var(--text-secondary);">
            ${escapeHtml(
              t(
                "select_high_intent_leads 圈选并加密回推源端私域 CRM 工作台的伪匿名令牌（零明文 PII 出湖）：",
                "Pseudonymous High-Intent Tokens Returned by select_high_intent_leads to Regional CRM (Zero Plaintext PII):"
              )
            )}
          </div>
          <div class="token-chip-list">
            ${strat.cohort_tokens.map((tk) => `<span class="token-chip">${escapeHtml(tk)}</span>`).join("")}
          </div>
        </div>
      </div>`;

    container.querySelectorAll("button[data-promo-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedPromoStrategy = btn.getAttribute("data-promo-key");
        renderPromoSupervisor();
      });
    });
  }

  // =========================================================================
  // 9. RENDER ACT 4: ZERO-INPRIVATE LIVE GATEWAY + CLICK-TO-MOUNT IFRAME
  // =========================================================================
  const ROUTE_DEFS = [
    {
      key: "nor",
      routeProp: "norDashboard",
      embedKey: "norEmbed",
      protocolTarget: "gtr-nor",
      badge_zh: "场景 1 · AI/BI 经营驾驶舱",
      badge_en: "Scenario 1 · AI/BI NOR Cockpit",
      title_zh: "全域净营收 (NOR) 与跨境免税品类高管驾驶舱",
      title_en: "Global NOR & Duty-Free Merchandising Executive Cockpit",
      desc_zh: "实机已发布 Lakeview 看板：6 大国际旅购旗舰线配额去化率、四项扣减瀑布与 GTR-EUR-202609 高售罄低净利预警。",
      desc_en: "Published Lakeview dashboard covering 6 flagship travel-retail lines, 4-bucket deduction waterfall, and GTR-EUR-202609 NOR margin alerts."
    },
    {
      key: "roi",
      routeProp: "roiDashboard",
      embedKey: "roiEmbed",
      protocolTarget: "gtr-roi",
      badge_zh: "场景 2 · AI/BI 渠道净 ROI",
      badge_en: "Scenario 2 · AI/BI Net ROI",
      title_zh: "全渠道投放净 ROI 与私域礼宾转化归因看板",
      title_en: "Omnichannel Net ROI & Private Concierge Attribution Dashboard",
      desc_zh: "穿透账面 GMV 虚胖与 28.6% 直播退订损耗，联动私域礼宾组五阶转化漏斗定位报价至锁位卡点。",
      desc_en: "Contrasts Gross GMV vs. Net NOR ROI across 6 channels and diagnoses 5-stage concierge conversion bottlenecks."
    },
    {
      key: "genie",
      routeProp: "genieRoom",
      embedKey: "genieRoom",
      protocolTarget: "gtr-genie",
      badge_zh: "场景 3 & 4 · Genie 对话问数",
      badge_en: "Scenarios 3 & 4 · Genie NL2SQL",
      title_zh: "寰宇旅购财务 NOR 与私域礼宾漏斗即席对话室",
      title_en: "Aether Travel & Retail Genie Conversational Room",
      desc_zh: "绑定 mv_travel_retail_nor 度量视图与 Serverless SQL Warehouse，支持自然语言追问净营收扣减与 GTR_OID_* 高潜圈选。",
      desc_en: "Live Genie Space backed by mv_travel_retail_nor Metric View and Serverless SQL Warehouse for ad-hoc financial & funnel Q&A."
    },
    {
      key: "notebook",
      routeProp: "agentNotebook",
      embedKey: null,
      protocolTarget: "gtr-agent",
      badge_zh: "场景 5 & 6 · Agent 工作台",
      badge_en: "Scenarios 5 & 6 · Agent Bricks",
      title_zh: "100% 私域礼宾智能质检 + 临期配额促收督导 Notebook",
      title_en: "100% Concierge Compliance QA & Quota Promo Supervisor Notebook",
      desc_zh: "在线检视并运行 inspect_service_conversation、calc_package_promo_bundle、select_high_intent_leads 与 run_inventory_promo_supervisor。",
      desc_en: "Interactive Databricks Notebook executing inspect_service_conversation, calc_package_promo_bundle, select_high_intent_leads, and run_inventory_promo_supervisor."
    },
    {
      key: "catalog",
      routeProp: "catalogExplorer",
      embedKey: null,
      protocolTarget: "gtr-all",
      badge_zh: "Unity Catalog · 数据与工具治理",
      badge_en: "Unity Catalog · Governance",
      title_zh: "travel_retail_ops 四层 Schema 与 UC 函数资产树",
      title_en: "travel_retail_ops Schemas, Metric View & UC Functions",
      desc_zh: "查看 ods / dwd / dws / ai_agents 四层表结构、mv_travel_retail_nor 语义口径与 GTR_OID_* 跨境伪匿名化治理边界。",
      desc_en: "Explore ods / dwd / dws / ai_agents tables, mv_travel_retail_nor Metric View, and GTR_OID_* cross-border pseudonymization lineage."
    }
  ];

  const PROTOCOL_QUICK_BUTTONS = [
    { target: "gtr-all", label_zh: "一键全开 (gtr-all)", label_en: "Launch All (gtr-all)" },
    { target: "gtr-nor", label_zh: "NOR 驾驶舱 (gtr-nor)", label_en: "NOR Cockpit (gtr-nor)" },
    { target: "gtr-roi", label_zh: "净 ROI 看板 (gtr-roi)", label_en: "Net ROI (gtr-roi)" },
    { target: "gtr-genie", label_zh: "Genie 问数 (gtr-genie)", label_en: "Genie Room (gtr-genie)" },
    { target: "gtr-agent", label_zh: "Agent 督导 (gtr-agent)", label_en: "Agent Bricks (gtr-agent)" }
  ];

  function probeBadgeHtml(p) {
    if (p.status === "ok") return `<span class="pill-tag tag-green">● ${escapeHtml(t("在线就绪", "READY"))}</span>`;
    if (p.status === "checking") return `<span class="pill-tag tag-blue">◌ ${escapeHtml(t("探测中", "CHECKING"))}</span>`;
    if (p.status === "warn") return `<span class="pill-tag tag-amber">● ${escapeHtml(t("就绪（直连）", "DIRECT"))}</span>`;
    return `<span class="pill-tag tag-blue">○ ${escapeHtml(t("待解锁", "IDLE"))}</span>`;
  }

  function renderLiveGate() {
    const mount = document.getElementById("liveGateMount");
    if (!mount) return;

    if (!liveState.unlocked || !liveState.manifest) {
      mount.innerHTML = `
        <div class="live-gate-form">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
            <div>
              <div style="font-size:15px;font-weight:800;">
                🔒 ${escapeHtml(t("输入演示通行口令 · 解锁普通浏览器零无痕直连与页内实机看板", "Enter Demo Passcode · Unlock Normal-Browser SSO & Embedded Live Views"))}
              </div>
              <div style="font-size:12.5px;color:var(--text-secondary);margin-top:3px;">
                ${escapeHtml(
                  t(
                    "静态仓库仅存储 PBKDF2-SHA256 (210,000 次迭代) + AES-256-GCM 密文载荷，零明文租户/工作区地址泄露；口令在浏览器本地内存实时派生密钥解密。",
                    "Only PBKDF2-SHA256 (210,000 iter) + AES-256-GCM ciphertext is stored in the public repo. Decryption runs 100% client-side via WebCrypto."
                  )
                )}
              </div>
            </div>
            <span class="pill-tag tag-purple mono">PBKDF2-SHA256 · AES-256-GCM</span>
          </div>

          ${liveState.errorMsg ? `<div class="live-alert live-alert-error" role="alert">${escapeHtml(liveState.errorMsg)}</div>` : ""}
          ${liveState.infoMsg ? `<div class="live-alert live-alert-info">${escapeHtml(liveState.infoMsg)}</div>` : ""}

          <form id="liveUnlockForm" class="live-input-row" autocomplete="off">
            <div class="live-pass-wrap">
              <input
                id="livePasscodeInput"
                type="${liveState.showPasscode ? "text" : "password"}"
                placeholder="${escapeHtml(t("请输入实机演示口令（支持 #unlock=口令 免输直达）", "Enter live demo passcode (or use #unlock=<passcode>)"))}"
                aria-label="${escapeHtml(t("实机演示通行口令", "Live demo passcode"))}"
                required
              />
              <button type="button" id="btnTogglePassVis" class="btn btn-sm">
                ${escapeHtml(liveState.showPasscode ? t("隐藏", "Hide") : t("显示", "Show"))}
              </button>
            </div>
            <button type="submit" class="btn btn-gtr" ${liveState.busy ? "disabled" : ""}>
              ${escapeHtml(liveState.busy ? t("正在解密…", "Decrypting…") : t("🔓 解锁实机入口与内嵌看板", "🔓 Unlock Live Workspace & Embeds"))}
            </button>
          </form>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
            <label class="live-remember-label">
              <input type="checkbox" id="chkRememberGate" ${liveState.remember ? "checked" : ""} />
              <span>${escapeHtml(t("在本机浏览器记住解锁状态 30 天（localStorage 加密缓存，随时可清除）", "Remember unlocked state in this browser for 30 days (localStorage)"))}</span>
            </label>
            <span style="font-size:11.8px;color:var(--text-muted);">
              ${escapeHtml(t("还没口令？下方 5 段 1080p 实机录制视频与上方交互沙盘无需口令即可完整体验。", "No passcode? Explore the 5-chapter 1080p live recordings below and interactive workbench above freely."))}
            </span>
          </div>
        </div>`;

      const form = document.getElementById("liveUnlockForm");
      const input = document.getElementById("livePasscodeInput");
      const btnVis = document.getElementById("btnTogglePassVis");
      const chkRem = document.getElementById("chkRememberGate");

      if (btnVis && input) {
        btnVis.addEventListener("click", () => {
          const curVal = input.value;
          liveState.showPasscode = !liveState.showPasscode;
          renderLiveGate();
          const nextInput = document.getElementById("livePasscodeInput");
          if (nextInput) {
            nextInput.value = curVal;
            nextInput.focus();
          }
        });
      }
      if (chkRem) {
        chkRem.addEventListener("change", () => {
          liveState.remember = Boolean(chkRem.checked);
        });
      }
      if (form && input) {
        form.addEventListener("submit", async (ev) => {
          ev.preventDefault();
          await handleUnlockSubmit(input.value);
        });
      }
      return;
    }

    const m = liveState.manifest;
    const { adminHint, adminDomain } = resolveAdminHints(m);
    const activeEmbedSrc = buildEmbedUrl(m, liveState.activeEmbedKey);
    const activeRouteForNewTab =
      liveState.activeEmbedKey === "roiEmbed"
        ? m.routes.roiDashboard
        : liveState.activeEmbedKey === "genieRoom"
        ? m.routes.genieRoom
        : m.routes.norDashboard;
    const corpSsoBootstrapUrl = buildLaunchUrl(m, m.routes.norDashboard, "corp_b2b");

    mount.innerHTML = `
      <div class="live-unlocked-banner">
        <div>
          <div style="font-size:14.5px;font-weight:800;color:var(--status-green);">
            ✅ ${escapeHtml(t("实机工作区已解锁 · 普通浏览器直连（无需无痕窗口 / 无需切换 Profile）", "Live Databricks Workspace Unlocked · Normal-Browser Direct SSO Ready"))}
          </div>
          <div class="mono" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">
            Workspace: ${escapeHtml(m.workspaceHost)} · Org: ${escapeHtml(m.orgId)} · Catalog: ${escapeHtml(m.catalog)}
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" id="btnReprobe" class="btn btn-sm">${escapeHtml(t("↻ 重新检测连通性", "↻ Re-test Connectivity"))}</button>
          <button type="button" id="btnOpenAllGtrTabs" class="btn btn-sm btn-gtr">${escapeHtml(t("🚀 新标签页连开核心三视图", "🚀 Open Core 3 Live Tabs"))}</button>
          <button type="button" id="btnLockGate" class="btn btn-sm">${escapeHtml(t("🔒 清除本机缓存并锁定", "🔒 Clear Cache & Lock"))}</button>
        </div>
      </div>

      <div class="b2b-redeem-box">
        <div style="flex:1 1 460px;min-width:0;">
          <div style="font-size:13.2px;font-weight:800;">
            🪪 ${escapeHtml(t("首次在普通浏览器打开？支持企业日常身份零无痕直连（自动附带 Base64 编码 next_url）", "First Time in Normal Edge/Chrome? Direct Corporate B2B SSO with Base64-Encoded next_url"))}
          </div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">
            ${escapeHtml(
              t(
                `企业外部协作者账号 (${m.corpLoginHint}) 已在目标 Entra 租户完成 B2B 授权并授予 ${m.catalog} 全部权限 + SQL Warehouse 权限。所有跳转链接自动将目标路由编码为 Base64 next_url 参数，彻底消除 /aad/auth 回调 Invalid State 报错。`,
                `Corporate account (${m.corpLoginHint}) is provisioned via Entra B2B with full ${m.catalog} & SQL Warehouse grants. Launch links automatically Base64-encode next_url so /aad/auth callbacks never trigger Invalid State.`
              )
            )}
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a class="btn btn-emerald btn-sm" href="${escapeHtml(corpSsoBootstrapUrl)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(t("🪪 一键企业 SSO 登录并打开 NOR 驾驶舱 ↗", "🪪 1-Click Corporate SSO -> Open NOR Cockpit ↗"))}
          </a>
        </div>
      </div>

      <div style="margin-bottom:8px;font-size:12.5px;font-weight:800;color:var(--text-secondary);">
        ${escapeHtml(t("选择浏览器登录路由模式（实时重写下方所有直达链接）：", "Select Browser SSO Launch Mode (dynamically updates all launch URLs below):"))}
      </div>
      <div class="live-mode-grid">
        <button type="button" class="live-mode-option ${liveState.authMode === "corp_b2b" ? "active" : ""}" data-auth-mode="corp_b2b">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong style="font-size:13px;">${escapeHtml(t("① 普通浏览器 · 企业身份直连（推荐默认）", "1. Normal Browser · Corporate B2B SSO (Default)"))}</strong>
            <span class="pill-tag tag-green">${escapeHtml(t("零无痕", "Zero-InPrivate"))}</span>
          </div>
          <span style="font-size:11.8px;color:var(--text-secondary);">
            ${escapeHtml(
              t(
                `自动注入 Base64 next_url + login_hint=${m.corpLoginHint}，在日常已登录企业 Edge/Chrome 中直接静默换票进入 Databricks，不弹账号选择器、不撞租户墙。`,
                `Injects Base64 next_url + login_hint=${m.corpLoginHint} so normal corporate Edge/Chrome authenticates cleanly without account-picker loops.`
              )
            )}
          </span>
        </button>

        <button type="button" class="live-mode-option ${liveState.authMode === "tenant_admin" ? "active" : ""}" data-auth-mode="tenant_admin">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong style="font-size:13px;">${escapeHtml(t("② 演示租户管理员模式", "2. Demo Tenant Admin Hint"))}</strong>
            <span class="pill-tag tag-blue">Admin</span>
          </div>
          <span style="font-size:11.8px;color:var(--text-secondary);">
            ${escapeHtml(
              t(
                `自动注入 Base64 next_url + login_hint=${adminHint}，适合已登录演示租户管理员会话时一键直达。`,
                `Injects Base64 next_url + login_hint=${adminHint} for sessions signed in as the demo tenant administrator.`
              )
            )}
          </span>
        </button>

        <button type="button" class="live-mode-option ${liveState.authMode === "direct" ? "active" : ""}" data-auth-mode="direct">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong style="font-size:13px;">${escapeHtml(t("③ 纯净直连 URL（已有 Databricks 会话）", "3. Clean Direct URL (Active Session)"))}</strong>
            <span class="pill-tag tag-purple">Direct</span>
          </div>
          <span style="font-size:11.8px;color:var(--text-secondary);">
            ${escapeHtml(
              t(
                "直接打开 /dashboardsv3/... 或 /genie/... 原始路径，适合当前浏览器已完成过一次 Databricks 登录后的秒开切换。",
                "Opens raw /dashboardsv3/... or /genie/... routes directly once your browser already holds an active Databricks session cookie."
              )
            )}
          </span>
        </button>
      </div>

      <div class="live-probe-grid">
        <div class="live-probe-card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong style="font-size:12.5px;">Entra ID OIDC (${escapeHtml(m.tenantId.slice(0, 8))}…)</strong>
            ${probeBadgeHtml(liveState.probes.oidc)}
          </div>
          <div class="mono" style="font-size:11.5px;color:var(--text-muted);">${escapeHtml(liveState.probes.oidc.detail || adminDomain || m.tenantId)}</div>
        </div>
        <div class="live-probe-card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong style="font-size:12.5px;">Databricks /aad/auth SSO</strong>
            ${probeBadgeHtml(liveState.probes.aadAuth)}
          </div>
          <div class="mono" style="font-size:11.5px;color:var(--text-muted);">${escapeHtml(liveState.probes.aadAuth.detail || m.workspaceHost)}</div>
        </div>
        <div class="live-probe-card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong style="font-size:12.5px;">AI/BI Published Embed</strong>
            ${probeBadgeHtml(liveState.probes.embedPing)}
          </div>
          <div class="mono" style="font-size:11.5px;color:var(--text-muted);">${escapeHtml(liveState.probes.embedPing.detail || "Lakeview Embed v3")}</div>
        </div>
      </div>

      <div class="protocol-strip">
        <span style="font-size:12px;font-weight:800;color:var(--text-secondary);">
          ⚡ ${escapeHtml(t("本机专属演示浏览器协议快启 (zava-demo://)：", "Local Dedicated Profile Quick-Launch (zava-demo://):"))}
        </span>
        ${PROTOCOL_QUICK_BUTTONS.map(
          (b, idx) => `<a class="btn btn-sm ${idx === 0 ? "btn-ocean" : ""}" href="${escapeHtml(buildProtocolUrl(m, b.target))}">
            ${escapeHtml(t(b.label_zh, b.label_en))}
          </a>`
        ).join("")}
      </div>

      <div class="live-routes-grid">
        ${ROUTE_DEFS.map((r) => {
          const routePath = m.routes[r.routeProp];
          const launchHref = buildLaunchUrl(m, routePath, liveState.authMode);
          return `<div class="live-route-card">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
                <span class="pill-tag tag-blue">${escapeHtml(t(r.badge_zh, r.badge_en))}</span>
                <span class="mono" style="font-size:11px;color:var(--text-muted);">${escapeHtml(routePath.split("?")[0])}</span>
              </div>
              <div style="font-size:14.5px;font-weight:800;margin-bottom:4px;">${escapeHtml(t(r.title_zh, r.title_en))}</div>
              <div style="font-size:12.2px;color:var(--text-secondary);">${escapeHtml(t(r.desc_zh, r.desc_en))}</div>
            </div>
            <div class="live-route-actions">
              <a class="btn btn-gtr btn-sm" href="${escapeHtml(launchHref)}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(t("在新标签页打开实机 ↗", "Open Live in New Tab ↗"))}
              </a>
              ${
                r.embedKey
                  ? `<button type="button" class="btn btn-ocean btn-sm" data-mount-embed="${escapeHtml(r.embedKey)}">
                      ${escapeHtml(t("▣ 在下方页内内嵌预览", "▣ Preview Inline Below"))}
                    </button>`
                  : ""
              }
              <a class="btn btn-sm" href="${escapeHtml(buildProtocolUrl(m, r.protocolTarget))}" title="${escapeHtml(t("已配置本机 zava-demo:// 协议时一键唤起专属窗口", "Optional local zava-demo:// launcher"))}">
                ${escapeHtml(t("⚡ 本机专属窗口", "⚡ Local App"))}
              </a>
            </div>
          </div>`;
        }).join("")}
      </div>

      <div class="embed-viewer-shell" id="inlineEmbedShell">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:10px;">
          <div>
            <div style="font-size:14.5px;font-weight:800;">
              ▣ ${escapeHtml(t("页内嵌入式 Databricks AI/BI & Genie 实机画布（按需挂载 · 零初始弹窗风暴）", "Inline Embedded Databricks AI/BI & Genie Canvas (Click-to-Mount)"))}
            </div>
            <div style="font-size:12px;color:var(--text-secondary);">
              ${escapeHtml(
                t(
                  "仅在点击下方按钮时才挂载 <iframe>（避免未认证时自动触发多重 SSO 重定向）；若浏览器拦截跨站第三方 Cookie，请先点上方『在新标签页打开实机 ↗』完成一次 SSO 再刷新内嵌画布。",
                  "Mounts <iframe> strictly on user click to prevent background SSO redirect storms. If third-party cookies are blocked by browser policy, open once in a new tab first."
                )
              )}
            </div>
          </div>
          <a class="btn btn-sm" href="${escapeHtml(buildLaunchUrl(m, activeRouteForNewTab, liveState.authMode))}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(t("↗ 独立全屏打开当前视图", "↗ Pop Out Fullscreen"))}
          </a>
        </div>

        <div class="embed-toolbar">
          <button type="button" class="filter-chip ${liveState.activeEmbedKey === "norEmbed" ? "active" : ""}" data-select-embed="norEmbed">
            ${escapeHtml(t("① AI/BI 全域净营收 (NOR) 驾驶舱", "1. AI/BI Global NOR Cockpit"))}
          </button>
          <button type="button" class="filter-chip ${liveState.activeEmbedKey === "roiEmbed" ? "active" : ""}" data-select-embed="roiEmbed">
            ${escapeHtml(t("② AI/BI 全渠道净 ROI 与礼宾漏斗看板", "2. AI/BI Net ROI & Concierge Funnel"))}
          </button>
          <button type="button" class="filter-chip ${liveState.activeEmbedKey === "genieRoom" ? "active" : ""}" data-select-embed="genieRoom">
            ${escapeHtml(t("③ Genie 对话式财务与漏斗问数室", "3. Genie Conversational Room"))}
          </button>
          ${
            liveState.embedMounted
              ? `<button type="button" id="btnUnmountEmbed" class="btn btn-sm">${escapeHtml(t("✕ 卸载内嵌画布", "✕ Unmount Iframe"))}</button>`
              : `<button type="button" id="btnMountEmbed" class="btn btn-ocean btn-sm">${escapeHtml(t("▶ 立即在页内加载实机画布", "▶ Load Live Databricks Canvas Here"))}</button>`
          }
        </div>

        <div class="embed-stage">
          ${
            liveState.embedMounted
              ? `<iframe
                  class="live-embed-iframe"
                  src="${escapeHtml(activeEmbedSrc)}"
                  title="Databricks Live AI/BI & Genie Canvas"
                  loading="lazy"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allow="fullscreen; clipboard-write"
                ></iframe>`
              : `<div class="embed-placeholder">
                  <div style="font-weight:700;margin-bottom:6px;">
                    ${escapeHtml(t("内嵌画布处于待命状态（零自动请求，保证页面秒开）", "Embedded Live Canvas Standing By (Zero background requests until clicked)"))}
                  </div>
                  <div style="margin-bottom:12px;">
                    ${escapeHtml(
                      t(
                        "点击『▶ 立即在页内加载实机画布』或任一卡片上的『▣ 在下方页内内嵌预览』即可直接在当前页面交互操作 Azure Databricks 看板。",
                        "Click 'Load Live Databricks Canvas Here' or any 'Preview Inline Below' button above to mount the live Azure Databricks iframe."
                      )
                    )}
                  </div>
                  <button type="button" id="btnMountEmbedCenter" class="btn btn-gtr">
                    ${escapeHtml(t("▶ 挂载实机 AI/BI 看板 (Lakeview Embed)", "▶ Mount Live AI/BI Dashboard"))}
                  </button>
                </div>`
          }
        </div>
      </div>`;

    const btnLock = document.getElementById("btnLockGate");
    if (btnLock) {
      btnLock.addEventListener("click", () => {
        clearCachedSession();
        liveState.unlocked = false;
        liveState.manifest = null;
        liveState.embedMounted = false;
        liveState.infoMsg = t("已清除本机解锁缓存并重新锁定。", "Local unlock cache cleared and gateway locked.");
        renderLiveGate();
      });
    }

    const btnReprobe = document.getElementById("btnReprobe");
    if (btnReprobe) {
      btnReprobe.addEventListener("click", () => {
        runLiveProbes();
      });
    }

    const btnOpenAll = document.getElementById("btnOpenAllGtrTabs");
    if (btnOpenAll) {
      btnOpenAll.addEventListener("click", () => {
        [m.routes.norDashboard, m.routes.roiDashboard, m.routes.genieRoom].forEach((rt) => {
          window.open(buildLaunchUrl(m, rt, liveState.authMode), "_blank", "noopener,noreferrer");
        });
      });
    }

    mount.querySelectorAll("button[data-auth-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        liveState.authMode = btn.getAttribute("data-auth-mode");
        if (liveState.remember && liveState.manifest) {
          saveCachedSession(liveState.manifest);
        }
        renderLiveGate();
      });
    });

    mount.querySelectorAll("button[data-mount-embed]").forEach((btn) => {
      btn.addEventListener("click", () => {
        liveState.activeEmbedKey = btn.getAttribute("data-mount-embed");
        liveState.embedMounted = true;
        renderLiveGate();
        const shell = document.getElementById("inlineEmbedShell");
        if (shell) shell.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    mount.querySelectorAll("button[data-select-embed]").forEach((btn) => {
      btn.addEventListener("click", () => {
        liveState.activeEmbedKey = btn.getAttribute("data-select-embed");
        renderLiveGate();
      });
    });

    const btnMount = document.getElementById("btnMountEmbed");
    const btnMountCenter = document.getElementById("btnMountEmbedCenter");
    const btnUnmount = document.getElementById("btnUnmountEmbed");
    [btnMount, btnMountCenter].forEach((b) => {
      if (b) {
        b.addEventListener("click", () => {
          liveState.embedMounted = true;
          renderLiveGate();
        });
      }
    });
    if (btnUnmount) {
      btnUnmount.addEventListener("click", () => {
        liveState.embedMounted = false;
        renderLiveGate();
      });
    }
  }

  async function handleUnlockSubmit(rawPasscode, fromAutoHash) {
    liveState.busy = true;
    liveState.errorMsg = "";
    liveState.infoMsg = "";
    renderLiveGate();

    try {
      const manifest = await decryptLiveOrFixture(rawPasscode);
      liveState.manifest = manifest;
      liveState.unlocked = true;
      liveState.busy = false;
      if (liveState.remember && String(rawPasscode).trim() !== "unit-test-fixture-only") {
        saveCachedSession(manifest);
      }
      renderLiveGate();
      runLiveProbes();
      if (fromAutoHash) {
        const liveSec = document.getElementById("act-live");
        if (liveSec) liveSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      liveState.busy = false;
      liveState.unlocked = false;
      liveState.errorMsg = err && err.message ? err.message : String(err);
      renderLiveGate();
    }
  }

  // =========================================================================
  // 10. RENDER ACT 4: 5-CHAPTER 1080p LIVE RECORDING THEATER
  // =========================================================================
  function renderVideoTheater() {
    const listEl = document.getElementById("videoChapterList");
    const playerEl = document.getElementById("liveVideoPlayer");
    const titleEl = document.getElementById("activeVideoTitle");
    const descEl = document.getElementById("activeVideoDesc");
    const dlEl = document.getElementById("activeVideoDownload");
    if (!listEl || !playerEl) return;

    const cur = VIDEO_CHAPTERS.find((v) => v.id === state.activeVideoId) || VIDEO_CHAPTERS[0];

    if (playerEl.getAttribute("data-loaded-id") !== cur.id) {
      playerEl.setAttribute("data-loaded-id", cur.id);
      playerEl.setAttribute("src", cur.src);
      playerEl.load();
    }
    if (titleEl) titleEl.textContent = t(cur.title_zh, cur.title_en);
    if (descEl) descEl.textContent = t(cur.desc_zh, cur.desc_en);
    if (dlEl) dlEl.setAttribute("href", cur.src);

    listEl.innerHTML = VIDEO_CHAPTERS.map((v) => {
      const active = v.id === state.activeVideoId;
      return `<button type="button" class="video-chapter-btn ${active ? "active" : ""}" data-video-id="${escapeHtml(v.id)}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;">
          <span class="pill-tag ${active ? "tag-red" : "tag-blue"}">${escapeHtml(t(v.badge_zh, v.badge_en))}</span>
          <span class="mono" style="font-size:11px;color:var(--text-muted);">1080p MP4</span>
        </div>
        <div style="font-weight:800;font-size:13px;margin-top:2px;">${escapeHtml(t(v.title_zh, v.title_en))}</div>
        <div style="font-size:11.8px;color:var(--text-secondary);">${escapeHtml(t(v.desc_zh, v.desc_en))}</div>
      </button>`;
    }).join("");

    listEl.querySelectorAll("button[data-video-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeVideoId = btn.getAttribute("data-video-id");
        renderVideoTheater();
        const p = document.getElementById("liveVideoPlayer");
        if (p && typeof p.play === "function") {
          p.play().catch(() => {});
        }
      });
    });
  }

  // =========================================================================
  // 11. NAVIGATION, THEME, SUBTABS & URL #unlock=<passcode> BOOTSTRAP
  // =========================================================================
  function bindStaticControls() {
    // Draw.io external links
    document.querySelectorAll("[data-drawio-key]").forEach((el) => {
      const k = el.getAttribute("data-drawio-key");
      if (k && DRAWIO_URLS[k]) {
        el.setAttribute("href", DRAWIO_URLS[k]);
      }
    });

    // Theme toggle
    const btnTheme = document.getElementById("btnThemeToggle");
    if (btnTheme) {
      btnTheme.addEventListener("click", () => {
        const root = document.documentElement;
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try {
          localStorage.setItem("gtr_diamond_theme", next);
        } catch (_e) {}
      });
    }

    // Act 2 Subtabs
    document.querySelectorAll(".subtab-btn[data-subtab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-subtab");
        state.activeSubtab = target;
        document.querySelectorAll(".subtab-btn[data-subtab]").forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-subtab") === target);
        });
        document.querySelectorAll(".subtab-panel").forEach((p) => {
          p.classList.toggle("active", p.id === `panel-${target}`);
        });
      });
    });

    // Line filter chips (S1)
    document.querySelectorAll(".filter-chip[data-line-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.lineFilter = chip.getAttribute("data-line-filter");
        document.querySelectorAll(".filter-chip[data-line-filter]").forEach((c) => {
          c.classList.toggle("active", c.getAttribute("data-line-filter") === state.lineFilter);
        });
        const matching = PACKAGES.filter((p) => state.lineFilter === "ALL" || p.line_code === state.lineFilter);
        if (matching.length && !matching.some((p) => p.package_id === state.selectedPackageId)) {
          state.selectedPackageId = matching[0].package_id;
        }
        renderPackageTable();
        renderNorWaterfall();
      });
    });

    // QA risk filter chips (S5)
    document.querySelectorAll(".filter-chip[data-qa-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.qaRiskFilter = chip.getAttribute("data-qa-filter");
        document.querySelectorAll(".filter-chip[data-qa-filter]").forEach((c) => {
          c.classList.toggle("active", c.getAttribute("data-qa-filter") === state.qaRiskFilter);
        });
        renderSmartQa();
      });
    });

    // Smooth section jump highlight
    document.querySelectorAll(".act-jump[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".act-jump").forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  async function bootstrapLiveSession() {
    // 1. Check cached 30-day session first
    const cached = loadCachedSession();
    if (cached && cached.manifest) {
      liveState.manifest = cached.manifest;
      liveState.authMode = cached.authMode || "corp_b2b";
      liveState.unlocked = true;
    }

    // 2. Check #unlock=<passcode> in URL hash (never sent over HTTP; immediately scrubbed from URL bar)
    const rawHash = window.location.hash || "";
    const unlockMatch = rawHash.match(/(?:^|[#&?])unlock=([^&]+)/i);
    if (unlockMatch && unlockMatch[1]) {
      const secret = decodeURIComponent(unlockMatch[1]);
      if (window.history && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      await handleUnlockSubmit(secret, true);
      return;
    }

    renderLiveGate();
    if (liveState.unlocked) {
      runLiveProbes();
    }
  }

  function init() {
    try {
      const savedTheme = localStorage.getItem("gtr_diamond_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    } catch (_e) {}

    bindStaticControls();
    renderPackageTable();
    renderNorWaterfall();
    renderChannelRoi();
    renderCsFunnelTable();
    renderGenieWorkbench();
    renderSmartQa();
    renderPromoSupervisor();
    renderVideoTheater();
    bootstrapLiveSession();

    window.addEventListener("hashchange", () => {
      if (/(?:^|[#&?])unlock=([^&]+)/i.test(window.location.hash || "")) {
        bootstrapLiveSession();
      }
    });
  }

  // Expose deterministic WebCrypto + Base64 next_url verification helper for automated headless tests
  window.__gtrVerifyFixture = async function (sampleSecret, customBundle) {
    const secret = sampleSecret || "unit-test";
    const bundleToTest = customBundle || (await encryptManifestBundle(secret, SAMPLE_FIXTURE_MANIFEST));
    const m = await decryptManifestBundle(secret, bundleToTest);

    const roundTripOk = Boolean(
      m &&
        m.routes &&
        typeof m.routes.norDashboard === "string" &&
        (customBundle ? m.routes.norDashboard.startsWith("/") : m.workspaceHost === SAMPLE_FIXTURE_MANIFEST.workspaceHost)
    );

    const corpB2bUrl = buildLaunchUrl(m, m.routes.norDashboard, "corp_b2b");
    const tenantAdminUrl = buildLaunchUrl(m, m.routes.norDashboard, "tenant_admin");

    const rawCorpNext = (corpB2bUrl.match(/[?&]next_url=([^&]+)/) || [])[1] || "";
    const rawAdminNext = (tenantAdminUrl.match(/[?&]next_url=([^&]+)/) || [])[1] || "";

    let decodedCorpNextUrl = "";
    let decodedAdminNextUrl = "";
    try {
      decodedCorpNextUrl = atob(decodeURIComponent(rawCorpNext));
      decodedAdminNextUrl = atob(decodeURIComponent(rawAdminNext));
    } catch (_e) {
      decodedCorpNextUrl = "";
      decodedAdminNextUrl = "";
    }

    const nextUrlBase64Valid =
      decodedCorpNextUrl.startsWith("/") &&
      decodedCorpNextUrl === m.routes.norDashboard &&
      decodedAdminNextUrl.startsWith("/") &&
      decodedAdminNextUrl === m.routes.norDashboard;

    return {
      ok: roundTripOk && nextUrlBase64Valid,
      roundTripOk: roundTripOk,
      nextUrlBase64Valid: nextUrlBase64Valid,
      packages: PACKAGES.length,
      channels: CHANNELS.length,
      csTeams: CS_FUNNEL_TEAMS.length,
      qaRows: QA_AUDITS.length,
      videos: VIDEO_CHAPTERS.length,
      manifest: m,
      sampleCorpB2bUrl: corpB2bUrl,
      sampleTenantAdminUrl: tenantAdminUrl,
      sampleDirectUrl: buildLaunchUrl(m, m.routes.norDashboard, "direct"),
      expectedRoutePath: m.routes.norDashboard,
      encodedNextUrl: encodeAadNextUrl(m.routes.norDashboard),
      decodedCorpNextUrl: decodedCorpNextUrl,
      decodedAdminNextUrl: decodedAdminNextUrl,
      sampleEmbedNorUrl: buildEmbedUrl(m, "norEmbed"),
      sampleEmbedRoiUrl: buildEmbedUrl(m, "roiEmbed"),
      sampleEmbedGenieUrl: buildEmbedUrl(m, "genieRoom"),
      sampleProtocolUrl: buildProtocolUrl(m, "gtr-all")
    };
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
