/* ==========================================================================
   Viking Cruises Phase-2 AI Closed-Loop Showcase on Azure Databricks
   Bilingual Standalone Interactive Cockpit + Zero-Plaintext WebCrypto Gateway
   ========================================================================== */
(function () {
  "use strict";

  const IS_EN = (document.documentElement.lang || "").toLowerCase().startsWith("en");

  // Public Draw.io compressed architecture diagrams (zero tenant/credential info)
  const DRAWIO_URLS = {
    arch1: "https://app.diagrams.net/?title=Viking-01-Phase2-AI-Business-Scenarios-Architecture.drawio#R7V3ZcttGFv2arnIenAIaW%2FcjFiJJlTzxWPH4UQWTMIUxRWhAyEu%2BfureXrB0k5QskUQSpFwVqrE3Du5y7tLES%2B%2B%2B%2FdIU97dv6lW5IdRZfSNeRih1Q8chlMLIdzniqJF1U63kWDdwXf1Zqh3l6EO1KneDHdu63rTV%2FXBwWW%2B35bIdjBVNU38d7vap3gyvel%2BsS2PgellszNEP1aq9VQ%2FmO92GX8tqfasu7VC55a5Qe8uB3W2xqr%2F2hrwFcWICvx3ipU1dt4MhteHuW1puYFrVhInz5Y%2FbWT9AU27bY8cfOddWnuxLsXmQ80NouGmJl3yEB2y%2Fy2kL%2F%2FcAD5N8qrft6x2%2B1NgN778RL%2Bk2Ehqu8f%2BLiCQJSXyy8EkSkzgli5AkDP4tGEkyEi8IdV79p%2FpcbdeEOmnzUO3K3U%2BEOm9vi135Gu4p%2Fg1uGs7ACI%2FJIiAsJrELP3gKp12EhHMS5%2FCDOXBF2Dkj3MNNC5KE8gfz8aiEJHhdOHOe4OlTSpKIUOeXcluV%2FYF4DbNLnaSplp%2FhzsSsEJp%2F1I%2BpZqqBuR8N7u6L7fEZdHEG6%2FtiWbXfiRc7P3O6Z0pDwjhJxMMuSBwQ6lx%2F%2BL2bIubgw6aE54Q6%2F0rf4aaAsAg3ccIoTLuef9jZxykKCAvghPI8C5wrlyQpbspJnMhNcQYjSU6Yp45i8s3G4hIuTn4Ab4cH8kcM00milFDH7243juUrli%2BCJv23YL5jtQsdn2LwnnAjHgLHMrjRJOvBghMe4WNEOIm57UL6RYtXqF4rHbxN2tQP21UJn5FLvOTrbdWW1%2FfFErZ%2BbYp74iW37d1Gbv5UbTZpvakbPNbjCycBaZHs2qb%2BXNq2AEp64zn%2BR7yk2FTrLfGyTflJomxZbddX%2BFfmMtijWUqhy%2FR9fymbtvy2V3y4Unah2C%2Fru7JtvhPqyAM8Ke2kwFfC72tPeAZMDt72BGdIpdCWAnutz6xklZcSmkuZ9HTRRQ3R5f5s%2FxwAhxFJaPftdJgPAboglzSwTYETIp6dwQcSL0CwwCUi%2BIhorr5Qjh9CBP8Abglh4fPAsyp2t3pf%2BONt0bZls8U3DN%2BUBUeOE7Gs26IUnfszM9GYOzlHbAFKqmWxiSXG2vr%2BKOJoN%2FQH7J6FErwSg64C87V8etcEt77ZDrrBSaDrOoGBXcot0GUKz6fCrmdgl%2F58SKB3CA5Qs8YWIbvIQWTzOP7zoQEhmhVt8bEvFRNOeIgnT1AYajSjtoar9K6bUFSoEeD%2BIgjOozBcPBrBWR5fEsHqZl8ewcFxCPveJSDsGxB%2BU66Kzaaqt0oLByTBH0wZHDFTBtyCMNDmr37Prgl1Xndq1sk%2BZMbI9U8XAGDGfcYeCUClni8GQHWzLw%2FAaATAwNT%2Fnk2Geu6JARgYAHy%2FBSuaOmnRFpt6rcTeUJJ1Ys9U9AwMwFgYjBy0OVjLAboPvjJlZxxOAoc%2BMwWhFYc0OjEOQwOH12XzpWw25U5oXgbSD%2BAVodUYdRCkzpt6V1TLztuN0FNxpYGaeDPeJoK3iD1S7rmnVryRgTdP%2Bz0xYWnPamQgsQT5wRjhVNuII9swADDCARFwAkggPIF9ieCIGP0ejvKSOq%2F8zmG%2FgO4eOdjHMBzkwQUxrG%2F2xTHM3OPGY%2BBewnhkBoY7Kigrdrcf66JZ7WNz0F1hCG%2FuoBMfASYZkmQ8Az%2BeOq%2BGRJEB2wugMuFu6qZ%2FEcmqb%2FblUTn2yi0WpR%2FZNLkfnBaV%2FAAqO2pSqHNfWovMajYGMJJwuYlninlcdH7RJCGaUt91%2FioQ1Td7coj6rsXrvghElbTuY9RkwH3Q8oBMrb4jRRIdIMcjtA1CyZJyOk2IhhllGf%2BLQFTf7MkhGlrsUztET63bXTOm6PeI%2BbHDHaFdypA7p8rhTob4FP46kkcsVYczGdPjyMczRKQZ4Dk7Pn3PY2n8OHwuFjm9KD71zb44Pt3HMJc0vITx6ZqRo%2BtiU%2B4%2B1c0SVHz67o01tPtK6X6k4VlGePBa6nzOZEwopq8RlghI%2BOF1chgMAymHTbm5%2B1y2S5gWh3hJdYdJDEmxuxcpEJ%2Bqb4DDPjbv62rb4gwFCQmyHlyW5bYtmxEYHPPluwvKvaSHvqviY7l5W%2B%2BqFkhcL%2FtYt219txeeG9g9KZaf1%2FhR2eSufJCsulsTmm%2Bqj4TmBcQn4E2uwAktduWO0Pz631c3mfz7592X9cuAcMxdhhY1zkwEqrGTAdAM%2FyA5FEihJoQjzVWQB0PqcQYoo%2Bj2JL4CYSyJJRnSUQzTHvhGcAEhShPErTxdDm6%2FMARij9A8T%2BH5%2FpVKcSw3JoSzGbhnAS51JopcM%2BqjaJ9cxb1TyUQJFvNoIokVqmn2TuKfZxh5D9RhEWBeJPYwB2QrzePrd2iQhhhzR%2FIrTmegwo%2Fq5q5Y3lbb8mZTFs0Ws63yq2K7fijW5Q3w1NWy3J1M4HqexSi9BGzNWJHNSQogPywWkaG8J4L1YKpy2lLcXzn3e%2FLAirt7EcBU%2BSJszO%2FHqTpbJD%2BRBH%2FwHE3gCHK2Ej4jeR%2BSk7o9AYjHwncyKDYjTf1cD0KdvFi2NVzQJlP%2FIDRx8fS5xKQEts5bCjBEigGEOCNxMMvQkbKHab6Rk3wyoRmEE4GbGWhScFt8EZTTrw8fdwdcJcF8Du3ZkWgzM%2BkgYh8Q5s7ggx%2FbYvO9rZYAPpz0G5jy04m6yWDPEiDKrq4FD0%2FJIJ9NuUYANAoOjhWQSVNv%2F1QEPjg%2Ffi%2BvMwCpl8Qz5CDrua0b2Ezza%2FHrJl4u64dt%2B4Kwc71gGFyfCuzMCNAgUr7448qOrn1pbL3QuoCpyIfDpGBBfsbejLqRoEMtc9NN%2FMvhTsdxdC77NNxqakZ1nlCGI4pIlmLKY0xHdSMaW%2BtIFCxDkJg695eFtkR4M%2FfNefWY3ORTFcs44%2Bf0oyAIufU5r9OMdt%2Bf4GLBvUK6Iqb4WJrMFV%2BkiB54YBWLUAOoElm40it3CUjiwvNT5%2Fdt%2BZuaTcZlfQlzwDW0PuzhkpnuXhh6gWgPsUCRdgneHb4by92p63Yuad5zcIcubH83EwenKH8x83N4Hi78A4nchyMfTjf0Tn6kJ6l8Ccb5M9xUU9SafH3q0hczxJZ9uFZmkSt5MFkTh9CCQJqCjYQwtauyrNygL3lVfAZz6Zd6s5o11MU0lOdNREOZMbOTaahrJdIiyZQJtJpA%2FgvpI1GPmcCbflt8E3cuY4g94a%2BrNc3aTIvVaHmA3mWui2ojWLL0tthusYwb3XImUjlCYB9lddtIGemrR1i%2FFtuvNVBakH%2BX2fh6THdizB7Ph3hTKt0vkXgCGiuXbD6PbOJMv%2FxZUe1VVB59pKLip1ZUZqTTKNKw00ciYznqZS6J9A9H5Smh%2BTMg2TH5k4kqX65crQVmJkcA8JlTMghNocjePjRfqvLrCRz9sToLpqLOzDjme7Ck35Rtg%2BUY%2F6nKr3uoTVVab%2BaBhiDHhLACuEX2zFDUZjMS4fUV22Jd3gGtua6%2FlM222EICTv5%2BVzY3b5vqS7F8QZp9jMXQlnd8CSxagpOnMa1sxpJZH4ceqJCefAG7CTMACFPt3qrykL34noDJ1btvXfYfQkmVTLIRdpWHaQSx%2BqjNFEXeGR7JAg1SfGhxWq4rCTmJQ3W2pDNy7IaTvGhPUAjLL7SVzQriMFIlYay7irePaKCwQ0wHfUAgUxJJhNjFwAtyFrGnLp3bbkYHqQNlmGFHAxGlgRBh1L35Y3ciryirNFJZwy5C3iINSUpRzDRKQtIPiMt8T5XzAcakD0CT5mVuqvpH3I%2BRR0VVBVQS4JP6yPPojCu8gdiT3w%2BIem7PYJVpqj3LBRg1Yc0moDJm23W%2F7WozEay2q8tOnGtPj1R2Xv%2F7ilDnw6%2F7TNgQhSPKIYkRjQj8nuRX6OCIUR8i9uEotCCLdDGbDHtS724%2BFE15Wz%2FsXjIJxB%2BFqNhULFczKj%2BsIf6laMuvxZ4cEEsThgXSzbEWfSpQL2uWVfGybHATo8UrNIWl%2BuMfiEh7ZlL82811%2B7Cq6pdDZEidaSLSjNWbhUIuGiv9hl%2BWos0ZTOtyWzbFBlONZBXsywGIhePo50QcIDPqfjIHyKxe1y5R3gXHxhTpAV4Wj2IM7Gz5mw8CffIqHGxTiCyKH6G8SuJOwlEyk7DQZBVcuyz9M8OmonAgUR2oQniFvX4Cg6BrL7VQtSgU7QGK6uZT3ZTLYteqQ0dTLUloWdIl2qrJWwllsZg62Q9UODzWOcKbkuEIpLLl28ZHYrlKI%2BJIg%2FfnKkPHEP0OnioXwFXvnysAZqrWAqeaU%2FRuxFGZBZJn8SDyRRpjdZhZVpnkyWQ8CD6uNLO1hrlEmNazpHUYEojOmvEHNSM9oWrk07CtvGf1530B1SgaymjVeCCDBcWuYGv2RjOVKKfOu9%2F3QX0S6pDnOBNiAhaDXB90zgfkmFHBYU2%2BEeQS82QVUxKrVJ4IFYROiBZcUz7I6WER8JZisnje09dI1MqQOBWasGeJMKmSuC9jYrHicLu3wnsBWQ5sBWcWhQnv20HOE%2BNy8Pja2NF6sPcu4YSB0vq%2BDS79i7rSMpIMiEhF8m3PexRSs1rcqxa1uru4WrTkkhjSxxNqsWu7YjZQmZXikfq%2B99tV2ezaYruqtuvTKUt%2FIsWpnqWs%2Btx%2BJB%2F4keM67af7kcfbCE1CX7JQyvskUAXAozhjL872qAAa6lKRAQSBncgWXdeax5zpUafuWIWVIuntxapuWXa9G8UJkQoFO8fv5TGFMqQvPWP9KrRzprU6Mv%2FCM4ZNXAUe9R2y3h3uCcTJgrwE1aZ%2BUhV%2FU9GHrlnPeKrdXrBOVF970hgRDQETrtKpol747tSaM4tiu%2BbMcj5Zzenbet5eRHPayu%2FHosifNee06onH%2BnIqRXbeGRNPTH2pSbeeczlOJx2323lczij6S7HO4VDqU%2BRbcExcmILWNDINhEoQuTi6Y7DUQ%2FqZsJ%2BrYGhl6g1DylN857GaCcHiCh2TKEYx6fGQAYyIM8N56OsxGxzrFOzBJnADF5KHhB%2BaotS%2Bnl5ahcGUM6orevHMIm1DU7n9JWdGmcMYl%2BR5j2fulQjLpOKe72mG2DvFn8nkZMiocQe%2BNtOsdCT9U4Ce05G61PntD%2BX3R2rpEMTirDH3a8zAjyaiMc0cDlMYBZKCHTVSnLWkXUum9XpbtdWXroHMTVYuq11Vb0%2BoNaOJdOHwzASMc1OywMwd0JqapOWdQzFu%2BmlktGn4T0AzoquGtKu6CiWQJat6nMvlbyJVGBPjI%2BncPBTQrF86IBQrvGcXYt6BTP8bmAnMluZn1FUOVo8YVVeitSIzt4S10lNPkGWrCUylviWNzDBLrKeawdENenmDwlTwep4hNrlMFjJXR3t3sWhsgJHEuD8VOtqcS3zIgKN4qEgGcLuiq17kUe6je8nrheiEGx%2F3HlMHQKNukTmW4JlD6SQDQa2yLwed5c6jT7MsC%2FOFRZ%2BmefHp02T1aWRpQGzVpzw8sfR7TLJPOOvTY0HMD3Xz%2BdOm%2Fno6fcn8ibCyF83uEbow6%2BlLoQv8Yb2oI6v%2BhZC0JJz7qilCP%2FCUKamLJ5%2BOBn3zsGmr1%2BrzU1og77JwqPPq%2BuEejLdd3ejsmf7qm7pXyb5u4eqg96nSy7qhQKoWfA1kqye56k3fg4LfPw15TSoDlpLyRuUg6h%2FA3wpl6oyIAsJj9JlXnallKnW1pElX16ITblCFx2JtWNGnF6lQSWALthi5YdG5D7xr3wYFrbAFqypu1Vf6PkeFqp383nNdwqE8oADjR6wweikFyCzWv1UB6jbTJ1v3zpbUY5aSOMlbPEkuSfpxMpsZl%2BCYHLCnfZW9cHscZdC8kQyazAnahObVqty2WHOMhYUv2cbKH4fYJ5KS7VvShmTi4tBcY7GqMPHF2tgKsCY5qQvwhUS0F1i9elTWz6Bq22R0x2ztjOLzotiPJoJie56IGSQYe%2B2GaWYy63uF7HFv19axEtoHZlqTz4A9L2AjdxrUoG%2Fr62%2BYeZZVSw6QSn1Lsm8lDpE7WL%2Bia%2FB7rPn6DFQA6rYt102BF6P5Vb2uljfx%2Ff0pAcsmEgH2zXyCNEuHi9mPm0IbkClX61ItMVM37W29rrfFZtGNJkOPpdvnqsZ1a2Dwv2XbfpcgKR7aegiycruKm6b%2BCmDY1MvPYiivNnvdHM%2Fz3SCwrMIzXiTnECAfgSwxGzAFh7FBnV390CzlXnoJmrZo1mWrBkM7ippyU0C4ZXC6k0HC1irfWF%2FE0jfwmaj4W79t7xRvGw%2BNmwZqffUOUhx3Z34LA72Gz6rzjbL1ZEvDfM%2F%2B%2FODuUOiKN9DBTj%2FJ85FoD92alWpGn3FYEGTG4wE8%2BjY8RpfA4whfgYxz7IPjGL6j%2FU%2BLR0vg19JRtZ%2FRcngZj1lx%2FgB0g1NA90UUpy0yputzVLf6WSwdeLeh7d2yCYil6IhYcgN%2BaP%2FTiiVLfK2fcSezI2ckPgWJ0WSQONZ4U4ZiYIZG4oe23tTFqmxmwB0CHLMBjl8CcN54bQ7mHwTceH8q23mcBXBmnEM1%2Fu%2FFGGTt7mx9PR%2Bm3ALTfeTXWa2vwBYr6Hd7DGWhmGyBP1pUut9VeMbJs3GiBoc48aaAE%2FvSu0kie7vIoLy1FeawhG7GyQvgxEaMCYPn0jixVdqZ3W5D8PHjQFfRzKh4CVTY6Ck6BXI8MMlx1WDXXK7CqFe%2BqAGccDd10%2Bm%2Bc5vvTy%2FicUV8lEgbDAzao%2Fsrj%2B0sBrDJkQ861WRYE6fKyGcAPhGAIsHwrwZAzz2jB2YjxR%2BzMoJYNJ7aOhFcEqUp9V1nwii1qUbRT%2BfsKFWlm2o5hegwTzDe32dnRKmNmzcX2DNLyY0C6hmcTxWhz7XmLyJCA3ZGHW4S%2BOnDDjKeqHN19YbIJi%2BxyjDML87ehxllGZ8uDm3svXeRdAvmhE%2FC4Xj%2FKDgfDkOTvR8WCUmKLOx6Ds0ofCoKL%2BLRGCgMn4bC0f6nRaFJ6T%2BtLu2fAMlVsbvVd%2FyD%2BPRsKYgXwqd%2F0DQ8uv9Z8WkLNJj9vvvtTUe9yucw6H6ZaYsv%2BRdxwl0zrhkeBKV5QHBGVNrCGmYfLIMR6jfdBdH6%2FLDG3xmeni1ccSl4jmUmd4%2FAc3TAWeFpi6aYPaG1rNRp5gybbXsqz%2FL50dm%2FNTxtUVf%2FudH5H4SnWhVIr0jsHYHn6ACfnxGetpoH21LWY3rI7AExw3M%2FPG2pu5eCpzfme9jTlPtZ4WkrhNC9%2BrEuMHFtqehYAMjiziyd4XkAnjZ%2F3b8ItW6gLQqPSc%2FxAd4ZeSNbCCjodaLgckmlcUsUayMVUeP6T3DifxSnVh%2FpublVL4NTJmM8j8YpOyPPHu5pXTaqxTbbCZiNev4J8HwRjskqUy%2BEVToSkdGRRPrxAS%2BDVRxvaujXhaPq0Ka4v31Tr0rY%2B%2F8%3D",
    arch2: "https://app.diagrams.net/?title=Viking-02-21V-Desensitization-to-HK-Databricks-Topology.drawio#R7V1Zc9w2Ev41qLIf4iIBkgM88nS8kROvleNxih7RI64oUsuhLGt%2F%2FVY3AJ6YQ9FcrkzKVRmBAAkSHxt9fN0kLLz%2F%2Fr5OH24%2FVjdZQah1852wiFBqe5ZFKIWWZ9Vi6ZZlnd%2Botq7hOv9fpjuq1sf8JlsNOjZVVTT5w7BxUZVltmgGbWldV0%2FDbl%2BrYnjVh3SZTRquF2kxbf0rv2lu9Y05Vnfg5yxf3qpLC64O3Ke6s2pY3aY31VOvicXE8gn8tggL66pqBk36wP33MCvgqernJc%2BX7Na5nX%2Bdlc228VvOVaqTfUuLR%2FV4CPWKhrDgC9xg86yemvffR7iZ4GtVNj%2BtcE1923v4TljQHSTUW%2BL%2F4xkJAhI4JHZI4BM%2FJLFHAg7%2FYk6CiPgx%2FpgRn5PYJT4lnMEPYRGOffwZ4Q6hlv8BZh57RMQk8NQP7pA4IUFIhI9X4MSPcHQA5%2B6fj3uEu4Ra1P5Tn8clAf7gehbcIYGtDvEEZ0ph%2BvEMp%2BMRav3U3hmcRBDfI0Koe%2FITQq03cbpqYLqrPH1LqBWlTfqlzhd3q%2F498BjvV583FkTMcOozPJToR09o8qW7olqOGhZ41Lh6SMvty2TjMlUP6SJvngnzrXeCrlk3fPC%2BfnQBg9n%2F77HOCLXC27xMh4%2FSJ5zij5D4Po6JiUjwBh384cEDFRYuUgzLQ633WZlnCEh4bv4SMEytQD8rHOzjCk%2FQEHNokSssQlxGiaEEWoIRLgwo%2BPThg1pAQIpEE4dJww%2BP8Bl2ngFk2%2BEwU7nsvRP6DvSHzi6uKCe%2BTUBMrF3r7jQOTFA9rpAEib5RvC24GxcPRQBHiWkR61E4dz7Dzog8LmfBiR%2F0wCNhoaFCBwihdfVY3mTw%2FtuEBU%2B3eZNdP6QLOPpUpw%2BEBbfNfaEOf82LIqyKqsaxzErsGfUBeE1d3WWmI4C8XnuC%2FxEWpEW%2BLAmLiuyrQu4iL5dX%2BFdkc%2BhRL9Rmwdt5f8vqJvu%2BVu7ZSujidpVV91lTPxNqqQFMiWm1UWmp%2FdQT%2Bq6W7bc9ge9RtdmojWbZnlkLWRYSmihh%2BnKZS6cydxcpZngh2hdNitmZOg83yjWJN5xqSAFpxnc7T8sM3sg3uk1JNqrBywn3UfQBWt%2B%2BDl436eq27Qt%2FfEqbJqtLxAC1HBPSAmGHdtge0Vu4%2FY5P8ZokiZu4hAWAo3yRFr5CYVM9bMUk7Zp%2Bh%2B6Rp%2BCtUIod8G919%2FYU%2Fu1kO3C7BwG3bbkTdM%2BoCdwa8YdCN5ug2%2FbfjQVoi2i1Y7iI6EBh3A8G2%2FF4y%2FYAxcI6PvSikHrU2xl6UvCdCnrtZPcOPdcdQs%2BdCtZW2e9Dz3EODD1nCr3gXauyDHQyxF4CEjH2YKP2UVJyi3DbJDtbsTrRD0AGC62U6G1c7d4zaBe2UhQCdkHsiRBLhbUVsg5zTwBZdwrZcJ20XK%2F6SUXWx1GBpbRnEJKsB138ITVj7mvAC9QapP4aImKZsn2CACQztd7gyEDJ6%2FGcUNEFncQjIsJDeBl5Cj%2FGy%2BAr5EtRnqB%2BO9a7T6BGgOrHoh3fDCuJEueEb0Y72UPLcs%2BeqhHezCDLbcc97IvhGZRkk8cAoCzflkTb1AxswdY0PDqyLOYJ394ZWeKkMred7N6RNZsNoUUdg%2F1lkrnMPrDMnRmgtdG450xt8NyXTgxl5aP45dorJayesEUHEegJ7WgHlQG20Q57X1Rf0mLkTzL6nE4hMSMnRtN8B1zHSeKdFNftZPeOa8FG6q%2FB8vJmBlzzQ%2BsSfIJrqiwvg8cyLDL0HV6ld9lt9bjKevZ9TKj1RwnOQmqFaZMW1RKP4lBfYlmA7jD1lYLeYYNbEBWH9Y42dMadAMTU9Vgc%2FCAKcTvZ%2FYPY264Qe9QAYmofeN8XUxCjDTe13oa%2B5p5QBgewVDKZxPKbzumspXcSfOj%2Bnjqh1wv%2FTpvFK%2Fv8BCD2Isoj8YOAuJ3swUHMxI4gZu6BQaw1mD6KO7MuRtHZQszVdhLXP%2Fom27pYQWuySRWYm2IFp%2Fc%2FWMnM8%2BIXWFn%2BKXVhPdmDI3U22xGprVw%2BGFKnAeDrtMhWX6t60YXp0JjXaFXOg9bLpf2ypkDlm55HF328gnUYpjJC6IPGDSFQ7ACNHKMZgXI8BK3Hw9ZDBPqKMfAY%2BFMBvLrLmgU8VouwIL9HPkCQrh4km%2BBr%2Fh1g3If2Q5WXDT5hNyBu1EPbIiubrB5hyTLomzEVLOiB9yr9khWfqlXe5BWc6EvVNNX9WnQX0D1IF3dLfCdNAlzdSJTfLwlNivwLoUkKhgMg4Qa2x3SVrQhNrv99NY%2FU3%2B9W35b7wbA9CacZfGjc4ELjB0awKZwmQN8EeSl9ZqGKkElZKGwQkGojDwaxtyCRMV%2F%2F%2BvMOeIbxDOGaqGi0RKnCraf6BBLVKOdlI8Bbm4QyNAfOM%2BuCZPiRz%2B%2FTxW1eZvMiS%2BsyL6HTVVouH9NlNr%2FO6m%2F5IlsdDtiMTQ26kwB7GklTezu3B97cIMawmAMw9G2Fta4xRCIOh1HcVw4OX%2BwA79F5B2AeC%2BHhUemE84ZaSkR8%2B4LwtQgPquYI4HYMmsdJwD2N1cko3S8ZzP7P9LFo1kN0HIXA2LGvpTxwYayfP%2Fqh0lxALZY2nUWC8AJBYAhli8caHTzJL9nzHB%2F3HlHHnDPVFabhtmls2MS3U%2FEw1iMgokkmPHAhdPQxyYUL19AKXZTcHugKAaq8gQ%2By9YLHJC3T4rnJF6C%2BojN83q3I%2FmDpWu55wtIQ7NqdhSvpnQv5yP0%2BF8%2FE8GxpD71osgGqXEV3Awc4qh3jDEMeQkj37pQM4aJaECkvnFILuHIBD4PNbw%2FEdrXGj8OZua4njI8D9BFr08sNdxbhE%2FBQe3eVbq8sVqF1G%2BwMV7N%2BK7MPkfb0GO3dod60k707MpEHfGTY6H66%2Ftmnrqf3u5Z8y3VQao0XiVo4V7mnetJt%2F%2Bcv7%2Be%2FfYjmPGG%2BoG8Vo1aZUAkYKnAJF8MJLsQBQJQJTb9tHxPTZBoXJiOpM4Aq2sk9%2BQMgwXrMG45YRF40uMm6iMSv4WcVzOAztOQEoA7m48ET5V5HXzahiL5Vo0WEXrINi%2B5oDjEug7qCD%2FcKwwUsBq719UNa37VuZLz5SLOn5VuS%2FBp%2FVocA%2FYGiRPNE25jW2NsnH5lSvaf7SrsYHNr9ls0hGRgBPlbpkEHCpmvyu0iecUANr74b6VHrbdmdhiMKAQftI9w4ahPI8N65dsG3vJUgUScP%2FOEzDHCSHnhApZkPZ6bavRobwliHYE5PXKFJ6Lu%2Ba3TQB0mw1cFpdU2f1c50GNK0PdwjmWGPbB3tR2WE2NO4vVTeJqFKk9mwuk3rbH57N1%2BowOcG5t7FRIB1Sst0md1nZTNfVt%2ByukxL8Agnf6yyev6pzr%2Bli%2Bc9WgwjtojDz8QJMw2qR1nRACnj%2Bjat0XRfZ6WCe1BvIkFgIivJuIzd2a1ylHRTgkRjFyiCVG6qGg7TBKyCOTz4ffpI3HPF3jQWrv1%2BrGc9qhjNn59%2B1aHrEcomtDkjYn%2B%2FuibUst8xsjlFag1z4x8IyzJrnqr6Trrv4u8PdbZafa4em2we5vXiMd%2BnR4VrQaS3ZXoepiudRrrNduHaGHfrF5EGqQ6UcK6dxmajsE9L9lDZjAc85rWkfHSES8e5TKeiyfZAu4nm8U9HfJLX2VNaFAdEueOchySm0yj5z%2B%2BACReh0HyfldQM0rBVNo1eFk%2Bl8wVoiWhm6AVqgz3%2FWv6a%2B4tF9VjuU6ja1sjYoQb6%2B0nwNo1pI952snS%2B5fCCzhf1Y77qSG8fs6bOF6An5NnT6gKxEWdCOp0%2FPdbf8uzpEFCj5wq1aZQZoQahyKwushUQIq%2F%2FfbXOM5veP0g%2FZAJrkOLKUUuXDfE%2FfVhdoGam58z%2FSmtJvd4nzhx2pjibBnw7Hm6Urm6%2FVGl9Yw6%2FSVqCjCcgj91P7M4h3MPgtB9V3teA6%2BoJNhHs828XCwaWdZmVWQ0JJ0m7AvvcXemIe3Au2tw0CtxBUVHFd0MhU6pd4ICh0zmoZWGXuEte3wZTR8M01DnvHhGGtMh%2FIEa38MH%2BKG%2ByetWk5U1eLg8IXlecCXinsWJD%2FoKEJAaFfAyubUhI2xHrUEDHhmCAq68g4zRtaHgalRnP4oLntXgOq2WZN%2Fm3juA4j7JFvsqrcq9sMPtMRfI0tmNAtaP4ucrh46GfR0dcfQwh7ghmCJV%2FfCya%2FCd9GZU6L71IKgg9vt4FvwOd4a%2BqvvtaVE8HxOfZSN1pGOiADB1DKvIoz1i6SMNeFpGHKocukyMOVUvuJeya9YSNId%2FDx%2FfSD5WDGPaVQLPkvV7nsRaPfSIiqMp9gkM92gk4mmmPPtAjcwCZIjERAfo7XJ%2BJECKjpiUptA9b4MmtXh%2B8rojNtAseQRZWP4UQ0md1WRm5wuPCccfgJgRJFCSxgZvAEz8Jz4abYNsj49Yx1RRwDHlU4sDcBGoI1R1KPnCspch6YZZefRZF3t8Qz5jw104vKDaWS5jcLpzNyNGl8CYi72mRFsUcFgdWMfSvrubCAmxtGdZUd1kpBw1ZcFtHmvRhAfIsEPJ8aiW4q3oCqUtypJjmKgnFegvMqXTDy01VIX1%2BdTkOYTVVEYhi4dV%2B7T5ZihUFkpyJJOJt4j5H%2BgxRr9xgvwBhgCQHuW7GWkFyrwoVA1puCAIrucGNz7SMZ8qakLbwUeRfFEWeUf6Fib9D9cqjyT%2BH7iL%2FDOQseujaE2waB8Z8%2FPdpkz2lz6RNfR4EgeU%2B6qrMO2EG4JtPdXX%2F0BCa%2FI7v5yA%2Fv2UJzmD4hbq1kbr1sSrzpqr36SUZJXpweh76OpsGbP%2FKvtxWFdJ1NxO%2Bt9bg3UZHaPtZLWAVQRjlu%2FAUbBXwA7XxITv1gl9Ck7xssmWtYknJVbXMF3P%2F4WGvjpBzBa4pm9lQyroThRuqAk7rP5iQq1SdSZlzo0mjbSrOFRV8WATgAt8xSwaZsk02v8rLuz1SFkcFJTzvPOhgbE3O8qBotMk4nzryeqUnVCqBgB%2Fc0pp13MVZdk0UpVb4%2BaMKtYBd1OeF9Uq8tm4XVSnAkLp0QXl%2Bk5WNTCEFSvgehTO1zxTc0xA2MZSw5hrcGlpjsGQ3y0yXoanq5rZaVmVaxF1rMLRmerDJyhsfPoECy1tUizvZlOTFWtOGMcd2XUMFnnGBnE0Q2wEr8i7h1javOrVW1WO9UL3a%2BjNNWi%2BzRje6ZnzUWZFCjGRwOtNq41C%2FrtHw0B3UK9ed%2BRM09GA3LlipKAvJjv1t9fe6%2Fq52Epn7AwkJZ9zhtL3110PXEPJW6WfyeyyhEpJCXOC6Ca70bOHKXPEyuPIXwpUfEa6m6r%2FT9MhJnuYFuhugy84Wuo54oaQVL4SuOCJ0TdWF%2BylgiXYADKqSvBq6XZ%2BrCgvgQeN%2FsqZ5VrBLH5vqtRBf%2B%2B2VPUN8UGrw7%2BLdOQTe96JHGoLJhvyA9mtXKgPlIt02rbZrWu3ZKaTbbMz03qJHjvs73mbpxoTY1P%2Bw0s2Ukrgh2WryeYgfQsydO9ZnJqzzM5BszjQKNMmWPqUQW%2FtphjNZWG5aWHESITZyMLrWZuti3J85ztGEkmP4iKkxB3X8%2BTyMu0u%2Btu8jFeJHkE7HAvFelDBhQDS1zkFUrQ20iHiQiwygCXVtnxM7885dfhlXe42z97DyS1C6SR5t7U%2BZOJ78MgVNkAijCm5jsKL7ZMf%2BLIKLNtXldg9BS89BRJniDZK6oAmuwlehLK5LXvG2Wp%2BnqAvAJ7vg5PU4Mbl%2BZfbsqXEyde4rRp2gHbdP0f6o%2BgyfeL0t9qrVXvs1qTNZbZO3VBryx97KbMcdGvxsS6BJcPdV%2FR3viHvfGk%2B%2FLMjf%2Fyx7ospwAj9%2BZkqxvKD5hWg%2Bie%2F%2F6Gj27COi2ez8N3xNeFpfdJT2cUo0r%2F2%2B1Dmj2fsh0GwzzSIxDzgsPE2BhzVpj12iVKhrdOlv%2BorZBZ4vhudJQhEvh2ebKfV3BxxV3JqiEbJi98aM9%2F0rD0cxkI6F%2B304%2FqgpHvfql2AvX1w3VSyc7L%2FTZJWTirxj2cZ7WXrPsPTstT7fvyf%2FxtJpZNpsHzBzt8g%2Fy3M2DTio%2FHNNgQ8sMy90dl9gm4qBILOZSwU0giRrav3r%2BrdfT%2BzcXvetyDPZ1o2wPolz23bGZTy2wXo8YCus2SlhbQ7NbKvOYcjd2hOsjxPWO3P4m0gHr4b%2FXjZ0U%2FhkUvPa8HncTd9FUflVJ%2FUpudxi0dkCQqdYDgHx2rjJ35OHY2klVDryWoIo39j%2FsNLNFNXBKuu%2BLkLEne5TNm0Z938EFg9G%2FDwNMJk1iipvoQKO%2B3tsC9F5hONR%2F8Pi2BR1klUweC8tarcsUviMlKe%2BN6bq4bQEwkHq3Y%2Bxl5%2B76DaFMtlhQ5nYXldQ9wVbNR7r9OFWVgtm8f8B"
  };

  // Sanitized Unity Catalog rows from `viking_cruise.dws.*` (zero PII; only HMAC-SHA256 VKG_OID_* tokens)
  const SAILINGS = [
    {
      sailing_id: "VKG-RHI-202609",
      region_code: "RHI",
      route_zh: "莱茵河魅力之旅 11日",
      route_en: "Rhine Getaway 11-Day",
      region_zh: "莱茵河航区",
      region_en: "Rhine River",
      ship_zh: "维京艾斯特拉号",
      ship_en: "Viking Eistla",
      departure_date: "2026-09-18",
      days_to_departure: -12,
      sold_pax: 338,
      occupancy_rate: 0.967,
      hist_benchmark_occ_rate: 0.935,
      gross_ticket_revenue_cny: 12860000,
      shorex_addon_revenue_cny: 620000,
      port_tax_deduction_cny: 1085000,
      commission_rebate_cny: 2095000,
      fcc_offset_cny: 540000,
      nc_compensation_cny: 792000,
      net_cruise_revenue_cny: 8968000,
      ncr_margin_pct: 66.53,
      hist_benchmark_ncr_margin_pct: 82.8,
      ai_forecast_final_ncr_cny: 8968000,
      health_code: "HIGH_OCC_ALERT",
      health_zh: "满船不赚钱预警",
      health_en: "Full-Ship Low-NCR Alert",
      driver_zh: "临期依赖头部OTA冲量触发16.3%高阶返佣(+92万)，叠加巴塞尔低水位转运与违规签证承诺NC赔付(+79.2万)",
      driver_en: "Last-minute Head OTA volume push triggered 16.3% tiered rebate (+CNY 920K), compounded by Basel low-water bus transfer & unauthorized visa guarantee NC claims (+CNY 792K)"
    },
    {
      sailing_id: "VKG-DAN-202612",
      region_code: "DAN",
      route_zh: "多瑙河缤纷之旅 11日",
      route_en: "Romantic Danube 11-Day",
      region_zh: "多瑙河航区",
      region_en: "Danube River",
      ship_zh: "维京西格恩号",
      ship_en: "Viking Sigyn",
      departure_date: "2026-12-12",
      days_to_departure: 28,
      sold_pax: 224,
      occupancy_rate: 0.639,
      hist_benchmark_occ_rate: 0.82,
      gross_ticket_revenue_cny: 8512000,
      shorex_addon_revenue_cny: 485000,
      port_tax_deduction_cny: 695000,
      commission_rebate_cny: 612000,
      fcc_offset_cny: 290000,
      nc_compensation_cny: 115000,
      net_cruise_revenue_cny: 7285000,
      ncr_margin_pct: 80.97,
      hist_benchmark_ncr_margin_pct: 83.1,
      ai_forecast_final_ncr_cny: 9120000,
      health_code: "CABIN_GAP_ALERT",
      health_zh: "临期尾舱去化预警",
      health_en: "Last-Minute Cabin Gap Alert",
      driver_zh: "距启航28天仍余65间尾舱(其中Cat C法式露台房38间)，较历史T-28进度落后18.1个百分点，急需非降价礼包促收",
      driver_en: "65 unsold cabins at T-28 days (including 38 Cat C French Balcony), trailing historical T-28 pace by 18.1 pts; requires non-discount value bundle conversion"
    },
    {
      sailing_id: "VKG-DAN-202608",
      region_code: "DAN",
      route_zh: "多瑙河深度文化之旅 11日",
      route_en: "Danube Cultural Immersion 11-Day",
      region_zh: "多瑙河航区",
      region_en: "Danube River",
      ship_zh: "维京芙蕾雅号",
      ship_en: "Viking Freya",
      departure_date: "2026-08-22",
      days_to_departure: -39,
      sold_pax: 332,
      occupancy_rate: 0.944,
      hist_benchmark_occ_rate: 0.92,
      gross_ticket_revenue_cny: 13612000,
      shorex_addon_revenue_cny: 910000,
      port_tax_deduction_cny: 1040000,
      commission_rebate_cny: 890000,
      fcc_offset_cny: 380000,
      nc_compensation_cny: 142000,
      net_cruise_revenue_cny: 12070000,
      ncr_margin_pct: 83.12,
      hist_benchmark_ncr_margin_pct: 82.5,
      ai_forecast_final_ncr_cny: 12070000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target",
      driver_zh: "企微私域复购与官网直营占比达69%，返佣与NC赔付均控制在预算红线内",
      driver_en: "WeCom VIP repeat & direct web bookings reached 69%; commissions and NC claims tightly within budget ceiling"
    },
    {
      sailing_id: "VKG-MED-202610",
      region_code: "MED",
      route_zh: "地中海奥德赛 13日",
      route_en: "Mediterranean Odyssey 13-Day",
      region_zh: "地中海海轮",
      region_en: "Mediterranean Ocean",
      ship_zh: "维京猎户座号",
      ship_en: "Viking Orion",
      departure_date: "2026-10-15",
      days_to_departure: 14,
      sold_pax: 832,
      occupancy_rate: 0.912,
      hist_benchmark_occ_rate: 0.895,
      gross_ticket_revenue_cny: 46425000,
      shorex_addon_revenue_cny: 3480000,
      port_tax_deduction_cny: 3520000,
      commission_rebate_cny: 3180000,
      fcc_offset_cny: 920000,
      nc_compensation_cny: 395000,
      net_cruise_revenue_cny: 41890000,
      ncr_margin_pct: 83.94,
      hist_benchmark_ncr_margin_pct: 83.0,
      ai_forecast_final_ncr_cny: 43950000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target",
      driver_zh: "高客单海轮套房直客锁舱快，付费岸上游渗透率高",
      driver_en: "Fast direct lock-in on high-ticket ocean suites with strong paid shore-excursion attach rate"
    },
    {
      sailing_id: "VKG-RHI-202611",
      region_code: "RHI",
      route_zh: "莱茵河圣诞集市之旅 8日",
      route_en: "Rhine Christmas Markets 8-Day",
      region_zh: "莱茵河航区",
      region_en: "Rhine River",
      ship_zh: "维京赫尔莫德号",
      ship_en: "Viking Hermod",
      departure_date: "2026-11-28",
      days_to_departure: 19,
      sold_pax: 312,
      occupancy_rate: 0.889,
      hist_benchmark_occ_rate: 0.875,
      gross_ticket_revenue_cny: 10140000,
      shorex_addon_revenue_cny: 680000,
      port_tax_deduction_cny: 815000,
      commission_rebate_cny: 740000,
      fcc_offset_cny: 495000,
      nc_compensation_cny: 110000,
      net_cruise_revenue_cny: 8660000,
      ncr_margin_pct: 80.04,
      hist_benchmark_ncr_margin_pct: 80.5,
      ai_forecast_final_ncr_cny: 9240000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target",
      driver_zh: "老客FCC抵用券核销集中，整体净留存率符合预期",
      driver_en: "Concentrated repeat-guest FCC voucher redemption; overall Net NCR retention tracks plan"
    },
    {
      sailing_id: "VKG-SEI-202609",
      region_code: "SEI",
      route_zh: "塞纳河巴黎诺曼底 8日",
      route_en: "Paris & Heart of Normandy 8-Day",
      region_zh: "塞纳河航区",
      region_en: "Seine River",
      ship_zh: "维京卡丽号",
      ship_en: "Viking Kari",
      departure_date: "2026-09-25",
      days_to_departure: -5,
      sold_pax: 304,
      occupancy_rate: 0.923,
      hist_benchmark_occ_rate: 0.90,
      gross_ticket_revenue_cny: 10883000,
      shorex_addon_revenue_cny: 760000,
      port_tax_deduction_cny: 830000,
      commission_rebate_cny: 695000,
      fcc_offset_cny: 260000,
      nc_compensation_cny: 98000,
      net_cruise_revenue_cny: 9760000,
      ncr_margin_pct: 83.83,
      hist_benchmark_ncr_margin_pct: 82.9,
      ai_forecast_final_ncr_cny: 9760000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target",
      driver_zh: "直营公域种草转化高，零重大客诉赔付",
      driver_en: "Strong direct social-seeding conversion with zero major service compensation claims"
    },
    {
      sailing_id: "VKG-DAN-202610",
      region_code: "DAN",
      route_zh: "多瑙河浪漫音乐之旅 11日",
      route_en: "Danube Waltz & Music 11-Day",
      region_zh: "多瑙河航区",
      region_en: "Danube River",
      ship_zh: "维京伊敦号",
      ship_en: "Viking Idun",
      departure_date: "2026-10-29",
      days_to_departure: 33,
      sold_pax: 256,
      occupancy_rate: 0.728,
      hist_benchmark_occ_rate: 0.805,
      gross_ticket_revenue_cny: 10188000,
      shorex_addon_revenue_cny: 590000,
      port_tax_deduction_cny: 780000,
      commission_rebate_cny: 760000,
      fcc_offset_cny: 310000,
      nc_compensation_cny: 135000,
      net_cruise_revenue_cny: 8793000,
      ncr_margin_pct: 81.58,
      hist_benchmark_ncr_margin_pct: 82.4,
      ai_forecast_final_ncr_cny: 10250000,
      health_code: "CABIN_GAP_ALERT",
      health_zh: "临期尾舱去化预警",
      health_en: "Last-Minute Cabin Gap Alert",
      driver_zh: "T-33进度落后7.7个百分点，申根签排期顾虑导致定金转尾款放缓",
      driver_en: "Trailing historical T-33 pace by 7.7 pts; Schengen visa appointment anxiety slowing deposit-to-final-payment conversion"
    },
    {
      sailing_id: "VKG-MED-202611",
      region_code: "MED",
      route_zh: "大西洋与伊比利亚 15日",
      route_en: "Atlantic & Iberian Explorer 15-Day",
      region_zh: "地中海海轮",
      region_en: "Mediterranean Ocean",
      ship_zh: "维京金星号",
      ship_en: "Viking Venus",
      departure_date: "2026-11-08",
      days_to_departure: 24,
      sold_pax: 818,
      occupancy_rate: 0.895,
      hist_benchmark_occ_rate: 0.88,
      gross_ticket_revenue_cny: 51370000,
      shorex_addon_revenue_cny: 4120000,
      port_tax_deduction_cny: 3890000,
      commission_rebate_cny: 3320000,
      fcc_offset_cny: 1080000,
      nc_compensation_cny: 420000,
      net_cruise_revenue_cny: 46780000,
      ncr_margin_pct: 84.3,
      hist_benchmark_ncr_margin_pct: 83.6,
      ai_forecast_final_ncr_cny: 49600000,
      health_code: "HEALTHY",
      health_zh: "健康达标",
      health_en: "Healthy On-Target",
      driver_zh: "长航线高净值老客占比高，净收益率领跑全船队",
      driver_en: "High share of repeat HNW guests on extended ocean voyage; fleet-leading Net NCR margin"
    }
  ];

  const CHANNELS = [
    {
      channel_id: "CH_WECOM_VIP",
      name_zh: "企业微信私域老客复购",
      name_en: "WeCom Private-Domain VIP Repeat",
      type_zh: "自有私域直营",
      type_en: "Owned Private Direct",
      spend: 4800000,
      leads: 3420,
      deposits: 1180,
      paid_pax: 986,
      refund_pct: 4.2,
      gross_cny: 41215000,
      deduction_cny: 2980000,
      net_ncr_cny: 38235000,
      ncr_per_pax: 38778,
      gross_roi: 8.59,
      net_ncr_roi: 7.97,
      badge_tone: "tag-green",
      action_zh: "高优扩量",
      action_en: "Priority Scale-Up",
      rec_zh: "单客净NCR最高、零外部佣金、退改率最低（4.2%）",
      rec_en: "Highest Net NCR/pax (CNY 38,778), zero external agency rebate, lowest cancel/refund rate (4.2%)"
    },
    {
      channel_id: "CH_HOTLINE_400",
      name_zh: "400官方贵宾咨询专线",
      name_en: "400 Official VIP Concierge Hotline",
      type_zh: "自有私域直营",
      type_en: "Owned Private Direct",
      spend: 5200000,
      leads: 4160,
      deposits: 1020,
      paid_pax: 845,
      refund_pct: 5.5,
      gross_cny: 34476000,
      deduction_cny: 3120000,
      net_ncr_cny: 31356000,
      ncr_per_pax: 37108,
      gross_roi: 6.63,
      net_ncr_roi: 6.03,
      badge_tone: "tag-green",
      action_zh: "稳健维持",
      action_en: "Sustain & Upsell",
      rec_zh: "银发高净值客群首选沟通渠道，套房升级率高",
      rec_en: "Preferred channel for senior HNW travelers with strong suite upgrade conversion"
    },
    {
      channel_id: "CH_WECHAT_MP",
      name_zh: "微信公众号与小程序直营",
      name_en: "WeChat Official Account & Mini-Program",
      type_zh: "自有公域直营",
      type_en: "Owned Public Direct",
      spend: 8600000,
      leads: 9850,
      deposits: 1690,
      paid_pax: 1340,
      refund_pct: 6.8,
      gross_cny: 52930000,
      deduction_cny: 4650000,
      net_ncr_cny: 48280000,
      ncr_per_pax: 36030,
      gross_roi: 6.15,
      net_ncr_roi: 5.61,
      badge_tone: "tag-blue",
      action_zh: "主力增投",
      action_en: "Core Growth Invest",
      rec_zh: "品牌心智稳固，配合电销一组快速锁舱转化极佳",
      rec_en: "Strong brand equity; pairs with Telesales Team 1 for rapid cabin lock-in"
    },
    {
      channel_id: "CH_XHS_VIDEO",
      name_zh: "小红书与视频号内容种草",
      name_en: "Xiaohongshu & WeChat Video Seeding",
      type_zh: "自有公域直营",
      type_en: "Owned Public Direct",
      spend: 6400000,
      leads: 12600,
      deposits: 940,
      paid_pax: 685,
      refund_pct: 11.4,
      gross_cny: 26578000,
      deduction_cny: 2890000,
      net_ncr_cny: 23688000,
      ncr_per_pax: 34581,
      gross_roi: 4.15,
      net_ncr_roi: 3.70,
      badge_tone: "tag-amber",
      action_zh: "定向优化",
      action_en: "Optimize Visa Prep",
      rec_zh: "潜客量大但定金转尾款流失偏高，需前置申根签辅导（净ROI仍反超OTA！）",
      rec_en: "High lead volume with elevated deposit dropoff; front-load Schengen visa guidance (True NCR ROI still beats OTA!)"
    },
    {
      channel_id: "CH_OTA_HEAD",
      name_zh: "头部OTA分销平台",
      name_en: "Head OTA Distribution Platforms",
      type_zh: "外部OTA与分销代理",
      type_en: "External OTA & Agency",
      spend: 9500000,
      leads: 15400,
      deposits: 1820,
      paid_pax: 1160,
      refund_pct: 18.6,
      gross_cny: 44312000,
      deduction_cny: 13665000,
      net_ncr_cny: 30647000,
      ncr_per_pax: 26420,
      gross_roi: 4.66,
      net_ncr_roi: 3.23,
      badge_tone: "tag-red",
      action_zh: "严控临期冲量",
      action_en: "Cap Last-Minute Push",
      rec_zh: "表面GMV高，但15.5%+阶梯返佣与18.6%高退改侵蚀30.7%净ROI",
      rec_en: "High surface GMV, but 15.5%+ tiered rebates and 18.6% cancel/refund erode 30.7% of True Net NCR ROI"
    },
    {
      channel_id: "CH_TA_CHARTER",
      name_zh: "传统旅行社包舱分销",
      name_en: "Traditional Travel Agency Cabin Charter",
      type_zh: "外部OTA与分销代理",
      type_en: "External OTA & Agency",
      spend: 6100000,
      leads: 5800,
      deposits: 910,
      paid_pax: 690,
      refund_pct: 14.2,
      gross_cny: 26082000,
      deduction_cny: 7640000,
      net_ncr_cny: 18442000,
      ncr_per_pax: 26728,
      gross_roi: 4.28,
      net_ncr_roi: 3.02,
      badge_tone: "tag-red",
      action_zh: "结构性压缩",
      action_en: "Structurally Compress",
      rec_zh: "仅用于淡季长尾航次补量，禁止挤占旺季高毛利阳台房库存",
      rec_en: "Restrict to off-peak shoulder sailings; block allocation of peak high-margin balcony inventory"
    }
  ];

  const CS_FUNNEL_TEAMS = [
    {
      lead: "SUP_SH_02",
      team_zh: "电销二组（华东欧洲河轮组）",
      team_en: "Telesales Team 2 (East China Euro River)",
      focus_zh: "多瑙河 / 莱茵河",
      focus_en: "Danube / Rhine",
      inquiries: 2340,
      qualified: 1450,
      deposits: 710,
      final_paid: 512,
      inq_to_dep_pct: 30.34,
      dep_to_final_pct: 72.11,
      dropoff_pct: 27.89,
      followup_h: 6.4,
      reason_zh: "申根签证录指纹排期焦虑未及时安抚",
      reason_en: "Unaddressed Schengen visa biometric appointment anxiety",
      avg_order_ncr: 66200
    },
    {
      lead: "SUP_BJ_01",
      team_zh: "电销三组（华北与公域种草组）",
      team_en: "Telesales Team 3 (North China & Social Seeding)",
      focus_zh: "多瑙河 / 塞纳河",
      focus_en: "Danube / Seine",
      inquiries: 2190,
      qualified: 1260,
      deposits: 580,
      final_paid: 446,
      inq_to_dep_pct: 26.48,
      dep_to_final_pct: 76.9,
      dropoff_pct: 23.1,
      followup_h: 4.8,
      reason_zh: "对比OTA返现优惠产生价格异议",
      reason_en: "Price objection from OTA unauthorized cashback comparison",
      avg_order_ncr: 64800
    },
    {
      lead: "SUP_SH_04",
      team_zh: "售后与航前管家组（签证协同）",
      team_en: "Pre-Sailing Concierge & Visa Coordination",
      focus_zh: "全航线尾款催收",
      focus_en: "All-Fleet Final Balance",
      inquiries: 1420,
      qualified: 1180,
      deposits: 820,
      final_paid: 684,
      inq_to_dep_pct: 57.75,
      dep_to_final_pct: 83.41,
      dropoff_pct: 16.59,
      followup_h: 2.3,
      reason_zh: "河轮枯水期换乘大巴担忧",
      reason_en: "Concern over seasonal low-water river coach transfers",
      avg_order_ncr: 69500
    },
    {
      lead: "SUP_SH_03",
      team_zh: "400呼入贵宾服务组",
      team_en: "400 VIP Inbound Desk",
      focus_zh: "全航线综合",
      focus_en: "All-Fleet Inbound",
      inquiries: 1850,
      qualified: 1290,
      deposits: 695,
      final_paid: 608,
      inq_to_dep_pct: 37.57,
      dep_to_final_pct: 87.48,
      dropoff_pct: 12.52,
      followup_h: 0.6,
      reason_zh: "同行长辈体检健康评估待确认",
      reason_en: "Pending senior companion medical fitness clearance",
      avg_order_ncr: 73900
    },
    {
      lead: "SUP_SH_01",
      team_zh: "电销一组（尊享私域与海轮组）",
      team_en: "Telesales Team 1 (VIP Private-Domain & Ocean)",
      focus_zh: "地中海海轮 / 莱茵河",
      focus_en: "Mediterranean Ocean / Rhine",
      inquiries: 1680,
      qualified: 1120,
      deposits: 640,
      final_paid: 568,
      inq_to_dep_pct: 38.1,
      dep_to_final_pct: 88.75,
      dropoff_pct: 11.25,
      followup_h: 1.1,
      reason_zh: "航期与年假冲突改期",
      reason_en: "Schedule conflict rescheduling to later departure",
      avg_order_ncr: 76400
    }
  ];

  const GENIE_SCENARIOS = {
    s3: {
      convId: "01f1e62b705d1fdead4870a9806f5df2",
      msgId: "01f1e62b709e1eee84b249d4663b4b0e",
      badge: "SCENARIO 3 · FINANCE NL2SQL",
      prompt_zh: "哪些航次出现了满船不赚钱预警？请列出航次编码、满舱率、NCR净留存率以及四项扣减金额明细。",
      prompt_en: "Which sailings triggered the Full-Ship Low-NCR Margin Alert? List sailing ID, occupancy rate, Net NCR margin %, and all 4 deduction components.",
      sql_zh: "SELECT `sailing_id`, `occupancy_rate`, `ncr_margin_pct`,\n       `port_tax_deduction_cny`, `commission_rebate_cny`,\n       `fcc_offset_cny`, `nc_compensation_cny`\nFROM `viking_cruise`.`dws`.`dws_sailing_ncr_summary`\nWHERE `ncr_health_flag` ILIKE '%满船不赚钱预警%'\n  AND `sailing_id` IS NOT NULL\nORDER BY `occupancy_rate` DESC, `sailing_id` ASC;",
      sql_en: "SELECT `sailing_id`, `occupancy_rate`, `ncr_margin_pct`,\n       `port_tax_deduction_cny`, `commission_rebate_cny`,\n       `fcc_offset_cny`, `nc_compensation_cny`\nFROM `viking_cruise`.`dws`.`dws_sailing_ncr_summary`\nWHERE `ncr_health_flag` ILIKE '%FULL_SHIP_LOW_NCR%' /* UC localized health flag */\n  AND `sailing_id` IS NOT NULL\nORDER BY `occupancy_rate` DESC, `sailing_id` ASC;",
      synthesis_zh: "Genie 实机验证结论：共定位到 1 个高危预警航次 VKG-RHI-202609（莱茵河魅力之旅 11日），满舱率高达 96.7%（超历史基准 +3.2 pts），但 NCR 净留存率跌至 66.53%（较 82.8% 基准倒挂 -16.27 pts）。四项扣减合计 ¥451.2 万：港口税费 ¥108.5 万、头部 OTA 阶梯返佣 ¥209.5 万（主因 1）、老客 FCC 冲抵 ¥54.0 万、巴塞尔枯水期转运及违规签证承诺导致的 NC 服务赔付 ¥79.2 万（主因 2）。",
      synthesis_en: "Verified Genie Output: Pinpointed 1 alert voyage — VKG-RHI-202609 (Rhine Getaway 11-Day) at 96.7% occupancy (+3.2 pts vs historical benchmark), yet Net NCR margin dropped to 66.53% (-16.27 pts below the 82.8% benchmark). Total 4-part deductions hit CNY 4.512M: Port Taxes CNY 1.085M, Tiered OTA Rebates CNY 2.095M (Driver #1), FCC Voucher Offset CNY 540K, and NC Service Compensation CNY 792K from Basel low-water transfers & unauthorized visa promises (Driver #2)."
    },
    s4: {
      convId: "01f1e62b7e9f1d81acc5409b1265f4bc",
      msgId: "01f1e62b7eac1bf1995229e23a8e6dfa",
      badge: "SCENARIO 4 · CS FUNNEL NL2SQL",
      prompt_zh: "按定金后弃单流失率从高到低排序，列出各电销团队的定金后弃单流失率、平均首次跟进时长及首要流失卡点原因。",
      prompt_en: "Rank all 5 telesales teams by post-deposit dropoff rate descending, showing average first follow-up latency and top dropoff root cause.",
      sql_zh: "SELECT `team_name`, `deposit_dropoff_rate_pct`,\n       `avg_first_followup_hours`, `top_dropoff_reason`\nFROM `viking_cruise`.`dws`.`dws_cs_funnel_agent_daily`\nWHERE `team_name` IS NOT NULL\n  AND `deposit_dropoff_rate_pct` IS NOT NULL\nORDER BY `deposit_dropoff_rate_pct` DESC, `team_name` ASC;",
      sql_en: "SELECT `team_name`, `deposit_dropoff_rate_pct`,\n       `avg_first_followup_hours`, `top_dropoff_reason`\nFROM `viking_cruise`.`dws`.`dws_cs_funnel_agent_daily`\nWHERE `team_name` IS NOT NULL\n  AND `deposit_dropoff_rate_pct` IS NOT NULL\nORDER BY `deposit_dropoff_rate_pct` DESC, `team_name` ASC;",
      synthesis_zh: "Genie 实机验证结论：5 个电销团队呈显著“响应时效—留存负相关”。电销二组（华东欧洲河轮组）定金后弃单流失率最高达 27.89%，平均首次跟进长达 6.4 小时，核心卡点为“申根签证录指纹排期焦虑未及时安抚”；反观电销一组（尊享私域与海轮组）首次响应仅 1.1 小时，弃单率低至 11.25%（客单净 NCR ¥76,400）。建议将申根 VIP 陪签 SOP 前置至定金后 2 小时内自动触发。",
      synthesis_en: "Verified Genie Output: Across all 5 telesales teams, slower initial follow-up strongly correlates with post-deposit churn. Telesales Team 2 (East China Euro River) suffers the highest deposit dropoff at 27.89% with a 6.4h average first follow-up lag, driven by unaddressed Schengen visa biometric appointment anxiety — versus Team 1 (VIP Private-Domain) at 11.25% dropoff and 1.1h response (CNY 76,400 avg order NCR). Action: trigger automated VIP visa concierge SOP within 2 hours of deposit."
    }
  };

  const QA_AUDITS = [
    {
      id: "CONV_202609_901",
      sailing_id: "VKG-RHI-202609",
      token: "VKG_OID_8F3A92",
      team_zh: "电销二组（华东欧洲河轮组）",
      team_en: "Telesales Team 2 (East China River)",
      agent: "AGT_204",
      tier: "P0",
      risk_zh: "P0-高危违规承诺",
      risk_en: "P0 · High-Risk Unauthorized Promise",
      type_zh: "违规承诺包过申根签及拒签全额免责秒退",
      type_en: "Guaranteed 100% Schengen visa approval & unconditional zero-fee instant refund",
      evidence_zh: "“绿色通道包过申根签…拒签全额秒退连签证费都不扣”",
      evidence_en: "\"Green-channel 100% Schengen visa pass guaranteed... full instant refund without even visa fee deduction\"",
      claim_risk: 39800,
      action_zh: "已自动推送境内督导紧急回访更正条款，补发标准《拒签保障计划》确认函",
      action_en: "Auto-escalated to Shanghai supervisor for urgent corrective callback & standard Visa Protection Terms confirmation",
      model: "Agent Bricks CustomLLM (claude-sonnet-5-5)"
    },
    {
      id: "CONV_202609_902",
      sailing_id: "VKG-RHI-202609",
      token: "VKG_OID_4C19B7",
      team_zh: "电销二组（华东欧洲河轮组）",
      team_en: "Telesales Team 2 (East China River)",
      agent: "AGT_208",
      tier: "P0",
      risk_zh: "P0-高危违规承诺",
      risk_en: "P0 · High-Risk Unauthorized Promise",
      type_zh: "隐瞒河轮水位不可抗力条款并私自承诺退半价现金",
      type_en: "Concealed river low-water force-majeure clause & promised 50% cash ticket refund",
      evidence_zh: "“9月绝对不可能低水位换船…真换大巴当场退一半船票现金”",
      evidence_en: "\"Zero chance of low water in September... if coach transfer happens we refund 50% cash on the spot\"",
      claim_risk: 36800,
      action_zh: "高危拦截！巴塞尔低水位正是 VKG-RHI-202609 产生79.2万NC赔付主因，已触发合规复盘",
      action_en: "Critical intercept! Basel low-water claims drove VKG-RHI-202609's CNY 792K NC loss; mandatory compliance remediation triggered",
      model: "Agent Bricks CustomLLM (claude-sonnet-5-5)"
    },
    {
      id: "CONV_202612_903",
      sailing_id: "VKG-DAN-202612",
      token: "VKG_OID_9A41C3",
      team_zh: "电销三组（华北与公域种草组）",
      team_en: "Telesales Team 3 (North China & Social)",
      agent: "AGT_305",
      tier: "P0",
      risk_zh: "P0-高危违规承诺",
      risk_en: "P0 · High-Risk Unauthorized Promise",
      type_zh: "私许船上前台免费升阳台房+口头免除退改违约金",
      type_en: "Unauthorized free onboard balcony upgrade + verbal waiver of cancellation penalty",
      evidence_zh: "“私下备注到船上前台免费升一档标准阳台房，临期退改违约金免掉”",
      evidence_en: "\"I will privately note a free balcony upgrade at the ship front desk and waive any late cancellation fees\"",
      claim_risk: 18500,
      action_zh: "立即冻结越权备注，改派主管提供合规岸上游臻选礼包锁单",
      action_en: "Froze unauthorized booking note; reassigned supervisor to close with compliant Shorex Value Bundle",
      model: "Agent Bricks CustomLLM (claude-sonnet-5-5)"
    },
    {
      id: "CONV_202612_904",
      sailing_id: "VKG-DAN-202612",
      token: "VKG_OID_2E88F4",
      team_zh: "电销二组（华东欧洲河轮组）",
      team_en: "Telesales Team 2 (East China River)",
      agent: "AGT_211",
      tier: "P1",
      risk_zh: "P1-商机流失预警",
      risk_en: "P1 · High-Value Deal Loss Alert",
      type_zh: "生硬拒绝金卡老客议价且未介绍慢节奏岸上游礼遇",
      type_en: "Bluntly dismissed Gold VIP inquiry without pitching Leisurely Shorex & Value Bundle",
      evidence_zh: "“38800一分不能少，岸上游都是走路的您自己看着办吧”",
      evidence_en: "\"CNY 38,800 not a cent less, all shore excursions involve walking so decide for yourself\"",
      claim_risk: 77600,
      action_zh: "已转派金牌顾问组二次跟进，匹配多瑙河尾舱金卡专属促收礼包挽单",
      action_en: "Reassigned to Gold Concierge desk; matched with Danube Cat C Gold VIP Bundle in Scenario 6 workorder",
      model: "Agent Bricks CustomLLM (claude-sonnet-5-5)"
    },
    {
      id: "CONV_202610_905",
      sailing_id: "VKG-MED-202610",
      token: "VKG_OID_5C92E6",
      team_zh: "电销一组（尊享私域与海轮组）",
      team_en: "Telesales Team 1 (VIP Private-Domain)",
      agent: "AGT_102",
      tier: "COMPLIANT",
      risk_zh: "合规标杆",
      risk_en: "Compliant Gold Benchmark",
      type_zh: "无违规（条款清晰+VIP陪签主动服务）",
      type_en: "Zero violation (Clear T&C disclosure + proactive VIP visa accompaniment)",
      evidence_zh: "“按维京《拒签保障与不可抗力条款》…已预约VIP陪签与慢节奏漫步团”",
      evidence_en: "\"Per Viking Visa Protection & Force Majeure Terms... booked VIP biometric accompaniment & leisurely walking group\"",
      claim_risk: 0,
      action_zh: "纳入《维京金牌顾问标准话术库》示范样本",
      action_en: "Promoted into Viking Gold Advisor Playbook exemplar corpus",
      model: "Agent Bricks CustomLLM (claude-sonnet-5-5)"
    },
    {
      id: "CONV_202612_906",
      sailing_id: "VKG-DAN-202612",
      token: "VKG_OID_6B30D9",
      team_zh: "400呼入贵宾服务组",
      team_en: "400 VIP Inbound Desk",
      agent: "AGT_401",
      tier: "COMPLIANT",
      risk_zh: "合规标杆",
      risk_en: "Compliant Gold Benchmark",
      type_zh: "无违规（坚守公开票价盘+精准记录音乐会偏好）",
      type_en: "Zero violation (Held CNY 38,800 rack fare + captured Vienna Musikverein preference)",
      evidence_zh: "“坚守77600双人公开价不打折，精准捕捉维也纳金色大厅偏好待促收包触达”",
      evidence_en: "\"Maintained CNY 77,600 double-occupancy rack fare; logged Vienna Golden Hall preference for Scenario 6 bundle\"",
      claim_risk: 0,
      action_zh: "高潜尾舱转化种子客户，已自动推入场景六尾舱促收工单池",
      action_en: "Seeded directly into Scenario 6 Cabin Promo Supervisor target token pool",
      model: "Agent Bricks CustomLLM (claude-sonnet-5-5)"
    }
  ];

  const PROMO_SUPERVISOR = {
    workorder_id: "WO_PROMO_202612_01",
    sailing_id: "VKG-DAN-202612",
    days_out: 28,
    unsold_total: 65,
    unsold_cat_c: 38,
    target_batch_cabins: 20,
    cabin_zh: "Cat C 法式露台房",
    cabin_en: "Cat C French Balcony Stateroom",
    rack_fare_cny: 38800.0,
    projected_net_ncr_per_pax_cny: 34517.32,
    breakeven_floor_cny: 29500.0,
    safety_buffer_cny: 5017.32,
    perceived_value_cny: 4680.0,
    marginal_cost_cny: 1180.0,
    incremental_total_ncr_cny: 1380692.86,
    verdict_code: "PASS_GUARDRAIL",
    tokens: ["VKG_OID_9A41C3", "VKG_OID_2E88F4", "VKG_OID_6B30D9", "VKG_OID_1F74A8"],
    bundle_zh: "多瑙河冬日音乐季臻选礼遇包（非降价：维也纳金色大厅VIP音乐会 + 船上甄选配酒升级 + 优先选舱 + 上海/北京VIP陪签）",
    bundle_en: "Danube Winter Music Season Curated Value Bundle (Zero Price Cut: Vienna Golden Hall VIP Concert + Sommelier Wine Pairing + Priority Stateroom Selection + Shanghai/Beijing VIP Visa Accompaniment)",
    diagnosis_zh: "航次 VKG-DAN-202612（多瑙河缤纷之旅 11日）距出发 28 天，尾舱仍有 65 间未售（Cat C 38 间）。Agent Bricks 测算公开票价 ¥38,800/人可守住，扣除礼遇包边际成本 ¥1,180 后预计单客净 NCR 为 ¥34,517.32，高于保本红线 ¥29,500，单客安全垫达 +¥5,017.32，裁决 PASS_GUARDRAIL。整批预计贡献增量净 NCR ¥1,380,692.86（约 40 位高潜宾客转化），工单仅携带 VKG_OID_* 脱敏令牌加密回传上海 21V 企微电销台。",
    diagnosis_en: "Voyage VKG-DAN-202612 (Romantic Danube 11-Day) is 28 days from departure with 65 unsold cabins (38 Cat C French Balcony). Agent Bricks verifies the CNY 38,800/pax rack fare holds without discounting: after CNY 1,180 marginal bundle cost, projected Net NCR is CNY 34,517.32/pax — exceeding the CNY 29,500 breakeven floor by a +CNY 5,017.32 safety buffer (PASS_GUARDRAIL). Expected incremental Net NCR reaches CNY 1,380,692.86 (~40 converted guests), dispatched back to Shanghai 21V WeCom workbench using only VKG_OID_* tokens.",
    constraints_zh: [
      "礼遇包单客增量边际成本（¥1,180）须锁定在 ¥5,017.32 安全垫以内，严禁击穿 ¥29,500 保本净 NCR 红线",
      "严禁任何形式变相破价（包括私发折扣码、返现、差价补贴或口头承诺退差）",
      "整批增量净 NCR ¥1,380,692.86 对应约 20 间双人舱（40 人）锁单目标，每 24 小时回写尾款核销进度"
    ],
    constraints_en: [
      "Bundle marginal cost (CNY 1,180/pax) must remain strictly inside the CNY 5,017.32 safety buffer and never breach the CNY 29,500 Net NCR floor",
      "Zero disguised discounting permitted (no coupon codes, cash rebates, price-match subsidies, or verbal refund promises)",
      "CNY 1,380,692.86 incremental Net NCR assumes ~20 Cat C double cabins (40 pax); reconcile paid balance telemetry every 24h"
    ],
    segmentation_zh: [
      "VKG_OID_9A41C3、VKG_OID_1F74A8（银卡 · 已付定金待尾款）：最高优触达，确认 VIP 陪签排期并协助完成尾款锁舱",
      "VKG_OID_2E88F4（金卡 · 高潜未锁舱）：由金牌顾问二次跟进，突出金卡优先选舱、慢节奏漫步团与音乐会礼遇",
      "VKG_OID_6B30D9（首航新客 · 高潜未锁舱）：围绕维也纳金色大厅偏好耐心讲解 11 日行程亮点，不施压促单"
    ],
    segmentation_en: [
      "VKG_OID_9A41C3 & VKG_OID_1F74A8 (Silver Tier · Deposit Paid Pending Final): Highest priority; confirm VIP visa slot and assist final balance completion",
      "VKG_OID_2E88F4 (Gold Tier · High-Intent Unbooked): Gold Concierge callback highlighting priority cabin pick, leisurely shorex & concert perk",
      "VKG_OID_6B30D9 (First-Time Guest · High-Intent Unbooked): Consultative walkthrough centered on Vienna Golden Hall concert preference without pressure"
    ],
    redlines_zh: [
      "不虚构紧迫感或假倒计时（严禁“最后两间”“明天涨价”等无依据话术）",
      "不承诺礼遇包清单之外的升舱、免违约金或保过申根签权益",
      "不口头暗示可议价或返现补贴，坚守 ¥38,800 公开票价盘",
      "严格执行个人信息出境合规：跨境工单仅流转 VKG_OID_* 令牌，仅在上海 21V 企微端映射实名触达",
      "客户明确表示不便或拒绝时立即停止打扰并回填状态",
      "所有定金与尾款仅引导至维京官方对公收款渠道"
    ],
    redlines_en: [
      "Never fabricate scarcity or countdown pressure (no unverified 'last 2 cabins' or 'price hike tomorrow' claims)",
      "Never promise off-menu cabin upgrades, penalty waivers, or guaranteed Schengen visa approvals",
      "Never hint at price negotiation or cash rebates; uphold the CNY 38,800 published rack fare",
      "Enforce PIPL cross-border isolation: workorders carry only VKG_OID_* tokens; PII mapping stays strictly inside Shanghai 21V WeCom",
      "Immediately halt outreach and log opt-out if the guest declines or is unavailable",
      "Route all deposit and balance payments exclusively through official Viking payment channels"
    ]
  };

  // WebCrypto AES-256-GCM + PBKDF2-SHA256 (210,000 iterations) encrypted bundles
  const LIVE_STORAGE_KEY = "viking_diamond_live_gate_v1";
  const ZAVA_STORAGE_KEY = "zava_diamond_live_gate_v1";
  const LIVE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

  const LIVE_BUNDLE = {
    v: 1,
    kdf: "PBKDF2-SHA256",
    iter: 210000,
    alg: "AES-256-GCM",
    salt: "WoGIplys/Sw/6JbN+BYqsQ==",
    iv: "5ZqJA71Ubh7gO5Fs",
    ct: "j2NpeMc6//OJGMVl67dPwXyE0hkJ/qA/uS/bw1S2z2GQnZUAjnU9SoWaeefkDjK9VN2yPfcbvYjzaXBDbj9NSxfKKgE71QhxsZLgnjKy2caccn6ErWT9vTDVU2WeBEtO7J8JmbiTJf+2tjG3/Kk5lgSihu4wfSBId0z91V21mRrdUVQPALK6vd/d9d+4Mcn7/A4w4CeeS3TY0pqHbZfs5M4l2VXe9E9CfN/wxwADUN4Q0IkAL3BmfUP3NaS3ZStwod8odiSN1gcxfqgal0tADI1Wzz8ctghzlBbrzgXeQ0Q2WVH6AUQCrbSTtqxwyi8Xj2nhHwDQfotFIUHeV69c492clAL8HFGH9ikMtLO/d164qc2ex7MwchPLAIfsnPhKjcUDrRUo+R2JMwbuUOnezf+MHlhkwOupLQ2tjiRWwwLIkBFDOjw6UPlircYLsB0RdpbhGbyEc5Znb1k+NdCpjYQr41l+ST3K3MRD+GnD71IsuStiMcZoWT/abIEmNdGBp9mKomOtOC7NuKt6tRQy1So9euYsOBM7RLfVOxEqR3Za+tC+utI8ErziMKW9BU0bRDBKRlvS5gUUDd+Vz6Z52sqRI60Ya8DXd22MNUpzo82mhzCzePPXqpnn5G88yz1j1Qh9Wf0WPo1J64hbSbpLCVEHTKWEpToIrOGG2Fzz7fXMlUPi2is++E+IhMCq2elS8u064lCmaVFM0syocYBE6OqsL1XHw37yKqJDHXd3oft7tUGV2vRulpZnOo3rFm3Eu8RsCsllSnNtaMfG97dTS7D3nw/b7ySHdKaVF2LMpkplp3xhNjq6QUmh9O4PiJ6X1w9pKRA5qpNWDf1rkFk33FJlC2vSE3XYn5/7U/SIw9WplwPeOILKT16eVr3Nn4REDw252sma0gvwcwMGFZofdCmSAj6G5ALOZcRntf5i6JNnL5fknOU74EsVLs4NFtDA+KFqn7SgBLG8MUnCCkIU8M0YiJbdeFfncyRKYkx4iUe+wj++wjTILegQWH/XBafaSnBoSOVlQVVnB+SEwTdBZQBooyrPY+2nNrxv/45rJE1RqpPGIjwX+vI2n+OfB1YP00RTBA7M/Lt3Wy9ONPzs4yjMT0M0S3OcAC3+vdHzJTyyWVyXXVjh9GmolZrK1x5WdOFo3JDrOxIYw2CTPYS3bR3tsZw2tLRzU0Ikv0RXDXoDHGBVuHCFVdtkDp4I8Ovd8twxnEeOSryEz3wzB3waSwJp32QwLnUgsR85+cE5on8Rcs1eneD9SQxX7fjH5ZCdc+rwZCxlawaVHLMjU0X9cTD7btpskQhIuVodeAjyBbOvQVGI8dFbBjqFZaFexjB95Nf9q29dCUJt6tpFcFlTWNlaxEvwt57OibhV1nZTP5ce2R/fHkRwofSjTNv9kTvGxympN8YHwDqkIZfJm8T04PPzcPOAuRVsSCoc+AqHXcLrVjoNF2JYCy1awfvk6Hm/lxGrDIm546wy/LYQZK+jpe7m7mSAYgP2qUq2LBB256qjuCOqu43toTdSjHjn6Hix4eQ6tQSDYxC09caJAe8Xny3w3Dsb8Crezv2xXker7EP1pCnCh7ZH/XQJmF1vXz5u7uEyb2Cv9Zheql3Qs8HswrMf94jYtlhyzQVl5p/j1AXJYbixR9DL/9BEGNAk03vOj7gQLiQowRJULcTVO/u6PQFWUz7LZp02xkHO34QnLUY7qXCw3PGV8h5W5bEFfiMltGOFMKd6YX7kt9k3cLQGO7w5Qd6ULar8nXX0/QrFo+67V2RONglrGMz25K2F8gJ9Esf2GUNKgbC70U/L8vnZMwOO2N9v5oq9cdj/anu13wI1BETb+Bss/BfMSsLw62IisfNfO0vFpnoLPxW6lTYPs0JRoDo1vhUnSxtstO5XOPj8+36C1jaF0Yz7Jqnyf1cjXfCdEbUXxpPrntaZ3gvNneWz59PA76zHZdB+wiyz1qp6PYJPwTsqftRAz772I1hqV17OLrO8G25Jl6t+/Vkkxvnh7FcQfDHRfph4K98ESO+/wyQIg10grKoeqFDdlxXC6aPdEoaUbwpkIQ6t6bpQe7UfqY/QN7TmQBvTfIk="
  };

  const FIXTURE_BUNDLE = {
    v: 1,
    kdf: "PBKDF2-SHA256",
    iter: 210000,
    alg: "AES-256-GCM",
    salt: "0vtzI6UHchu895VfPXFl2w==",
    iv: "KVwJUZRqyOVIVFGo",
    ct: "/p11NBfTq2fwNBlJKywi0AZ/4rdhb4/mKWbIw9NLzNwvUfPilSlCSo1HSzNCLNm0d6jBfrrU4cuKOGfeszWMRUbIEPD3R+vkrAm/7r9XUC5FjRw3+PhdjEZaGM2myStn75n5HglLhJ+PXmqNUPonVVPsump0jCiHxiEzs8VmY3erQ30A9EbXjXiYr2X3V41nvTbyfYTiSDMFSBGiSKA9SzJHwxeI1p4GzkhHQ3lj8x99Qb3Hq2DPJ9+qxHUUQd3vgyiEtYy+7x2Kdtb4fzbSXvzHXwetx0ExZkomu16z1/v1x7/vG9d1WoortGcFUdjrnh8nIBiT9gnm+CvnEuVRybdoVG3Oat87Gy8evtor+1lkRhR6oXDCd8Dp3hPuWpiE1/6tqqH0KOXjzJcaqLzgYq0KZ6KCRSbYHunkvbZB3C/zDtXbnq8Z7xkTwHzpTaJ63L8E8zN9vF7sK32HandiITMG9wi6PGbtWYtGFzI3YR3XiI16r5UAhcsziltxDbdVnMRawDU+seNXPjvOlM+PkjYkWuH1J6affqDQz2FaxIzJROrJ24MBVxZYoaptgmbFg3gT2jyD/sLJecTqydD2+wGINw/dFyIJvjq9uWGAOsrhNYTw3FV2quv4HdZTR0BvCQj+VSNpggFRJeKbIEFQ1whpNliZXR5LZkhJYn11tlVWasYExBlu5HSXgOKY/oGlP08sZzJllu5OKmlPzQvQVHEWqsbLArDS1dG7jYmyjujs5ywfBLd6wZkii+XIEzJZSrBKVeZIW+Q5LXvzlFjVJYSznAtEMlcQhHoQdXw0f+JDiQ7KXY13E2JvNeOjOWTHNGruPDEUX99YkXCsoApE/qRdKdOwT6YgGpUGeTHtZCyrbElY88hSo1M+h2VRCs4fylPGskw4EPaC/byAfyw1bOxPwdcFAlwh8n24mtYSA2KmkWwYukLpkOx0hJf6EQGYciMu8LYnUNE91TLbRv8845qu5AyZTMlHEaYxo+Xt/Cf/VaysCEfiJb7QFq3h3rKdhS+VzfJcXkCYomEVljaEtXymFq7cYM6319NRkV4BEPLCEospoSrFXXM7Z2o9p97IzPZIN1+th1svtizRu32rAQ5/fU9coMnS/NBztrVG7uiLDQSRbUCpH9VpDm7SlC9Ifr4UKjLU06iNAR17l3dsmYOoZrfx1GH7B+m2tlqAufoCMTtcu1anME9rK0NPK8l8jYPC+hQkREqMbPf+uxF8oEcVoR/LUkUwBkKR9cFOYlAkan2qsK3F93AIq8oj3cyH5xh5E+kWeMPpcMwPbro8D+PYlZq71ykH0RIIsC6Y04ndmmlGAEri8L7KV97k2Ey84Sykx8Mu89s6BAJ2dA9Z17mSsyDnMRSJRJIR"
  };

  const VIDEO_CHAPTERS = [
    {
      idx: 0,
      badge: "CHAPTER 0 / FULL",
      src: "videos/ch0-full-walkthrough.mp4",
      duration: "1080p Full",
      title_zh: "全流程总览 · 维京游轮 Databricks 二期 AI 六大场景端到端实录",
      title_en: "Full Walkthrough · End-to-End 6-Scenario Live Databricks Recording",
      desc_zh: "完整串联 Unity Catalog (viking_cruise)、双 AI/BI 经营看板、Genie 问数追因与 Agent Bricks 质检/尾舱促收闭环",
      desc_en: "Complete tour across Unity Catalog (viking_cruise), dual AI/BI Dashboards, Genie NL2SQL, and Agent Bricks closed loop"
    },
    {
      idx: 1,
      badge: "CHAPTER 1 / 4",
      src: "videos/ch1-aibi-dashboards.mp4",
      duration: "AI/BI Dashboards",
      title_zh: "第一幕 · 航次净船票收入 (NCR) 驾驶舱与全渠道真实净 ROI 看板",
      title_en: "Chapter 1 · Sailing NCR Cockpit & Omnichannel True Net ROI Dashboards",
      desc_zh: "实机演示 VKG-RHI-202609 (96.7%满舱/66.53%净利率预警) 四项扣减瀑布与六大获客渠道真实净 NCR 对比",
      desc_en: "Live walkthrough of VKG-RHI-202609 (96.7% occ / 66.53% NCR alert) 4-deduction waterfall and 6-channel Net NCR ROI"
    },
    {
      idx: 2,
      badge: "CHAPTER 2 / 4",
      src: "videos/ch2-genie-nl2sql.mp4",
      duration: "Genie NL2SQL",
      title_zh: "第二幕 · AI/BI Genie 财务毛利侵蚀与客服定金流失自然语言追因",
      title_en: "Chapter 2 · AI/BI Genie Conversational Finance & CS Funnel Root-Cause",
      desc_zh: "实机生成 Unity Catalog SQL，定位电销二组 27.89% 定金弃单率与 6.4h 申根签焦虑跟进延迟",
      desc_en: "Real-time Unity Catalog SQL generation isolating Team 2's 27.89% deposit churn & 6.4h Schengen visa follow-up lag"
    },
    {
      idx: 3,
      badge: "CHAPTER 3 / 4",
      src: "videos/ch3-agent-smart-qa.mp4",
      duration: "Smart QA Agent",
      title_zh: "第三幕 · Agent Bricks 全量客服智能质检与 P0 违规承诺登船前拦截",
      title_en: "Chapter 3 · Agent Bricks Full-Volume Smart CS QA & P0 Risk Intercept",
      desc_zh: "inspect_service_conversation 精准捕获包过申根签、隐瞒巴塞尔低水位条款等 P0 话术风险",
      desc_en: "inspect_service_conversation catching illegal Schengen visa guarantees & concealed low-water clauses pre-departure"
    },
    {
      idx: 4,
      badge: "CHAPTER 4 / 4",
      src: "videos/ch4-agent-promo-supervisor.mp4",
      duration: "Promo Supervisor",
      title_zh: "第四幕 · Agent Bricks 临期尾舱动态促收督导与毛利安全垫护栏",
      title_en: "Chapter 4 · Agent Bricks Last-Minute Cabin Promo Supervisor & Guardrail",
      desc_zh: "VKG-DAN-202612 守住 ¥38,800 公开价，验证 ¥34,517.32 > ¥29,500 红线 (PASS_GUARDRAIL)，回传 VKG_OID 工单",
      desc_en: "VKG-DAN-202612 holding CNY 38,800 rack price, verifying CNY 34,517.32 > CNY 29,500 floor (PASS_GUARDRAIL) & VKG_OID dispatch"
    }
  ];

  const ROUTE_DEFS = [
    {
      key: "ncrDashboard",
      protocolKey: "ncr",
      embedKey: "ncrEmbed",
      badge: "SCENARIO 1 · AI/BI DASHBOARD",
      tone: "tag-red",
      title_zh: "航次净船票收入 (NCR) 经营驾驶舱",
      title_en: "Sailing Net Cruise Revenue (NCR) Cockpit",
      desc_zh: "8 大航次毛收入→四项扣减→真实净 NCR 瀑布与满船不赚钱/尾舱缺口实时预警看板（已开启 embed_credentials）",
      desc_en: "8-sailing Gross-to-NCR 4-deduction waterfall & margin/cabin alert AI/BI dashboard (embed_credentials enabled)"
    },
    {
      key: "roiDashboard",
      protocolKey: "roi",
      embedKey: "roiEmbed",
      badge: "SCENARIO 2 · AI/BI DASHBOARD",
      tone: "tag-blue",
      title_zh: "全渠道真实净 NCR ROI 归因看板",
      title_en: "Omnichannel True Net NCR ROI Dashboard",
      desc_zh: "企微私域复购 (7.97x 净ROI) vs 头部 OTA (阶梯返佣+高退改后仅 3.23x) 真实净贡献对比",
      desc_en: "WeCom VIP repeat (7.97x True NCR ROI) vs Head OTA (3.23x after tiered rebates & 18.6% refunds)"
    },
    {
      key: "genie",
      protocolKey: "genie",
      embedKey: "genie",
      badge: "SCENARIOS 3 & 4 · AI/BI GENIE",
      tone: "tag-purple",
      title_zh: "维京财务与客服漏斗 AI/BI Genie 对话问数空间",
      title_en: "Viking Finance & CS Funnel AI/BI Genie Room",
      desc_zh: "直接用自然语言追问 VKG-RHI-202609 四项扣减明细或 5 大电销团队定金弃单率根因",
      desc_en: "Conversational NL2SQL room for VKG-RHI-202609 deductions and 5-team telesales deposit dropoff root causes"
    },
    {
      key: "catalog",
      protocolKey: "all",
      embedKey: null,
      badge: "UNITY CATALOG · VIKING_CRUISE",
      tone: "tag-green",
      title_zh: "Unity Catalog 数据资产与 VKG_OID 脱敏治理目录",
      title_en: "Unity Catalog Explorer (viking_cruise)",
      desc_zh: "巡检 dws 经营汇总表、ai_agents 工具函数及 21V→香港跨境零明文 PII 治理血缘",
      desc_en: "Inspect viking_cruise.dws tables, ai_agents UC functions, and 21V-to-HK zero-PII lineage"
    },
    {
      key: "notebook",
      protocolKey: "notebook",
      embedKey: null,
      badge: "SCENARIOS 5 & 6 · AGENT BRICKS",
      tone: "tag-amber",
      title_zh: "Agent Bricks 智能客服质检与尾舱动态促收 Notebook",
      title_en: "Agent Bricks Smart QA & Cabin Promo Supervisor Notebook",
      desc_zh: "在线运行 inspect_service_conversation 与 run_cabin_promo_supervisor 毛利红线护栏推演",
      desc_en: "Execute inspect_service_conversation and run_cabin_promo_supervisor margin guardrail live"
    }
  ];

  // Interactive UI State
  const uiState = {
    act1Subtab: "s1",
    s1HealthFilter: "ALL",
    s1RegionFilter: "ALL",
    s1Sort: "default",
    selectedSailingId: "VKG-RHI-202609",
    activeGenieKey: "s3",
    qaRiskFilter: "ALL",
    selectedQaId: "CONV_202609_901",
    s6Tab: "guardrail",
    activeVideoIdx: 0
  };

  const liveState = {
    unlocked: false,
    isFixture: false,
    manifest: null,
    expiresAt: 0,
    zavaSessionDetected: false,
    routingMode: "corp_b2b", // DEFAULT: Microsoft Corporate Account B2B Direct for Normal Browser!
    remember30d: true,
    errorMsg: "",
    infoMsg: "",
    activeEmbedKey: null,
    probes: {
      site: { status: "idle", detail: "" },
      oidc: { status: "idle", detail: "" },
      dbx: { status: "idle", detail: "" }
    }
  };

  function tr(zh, en) {
    return IS_EN ? en : zh;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fmtCny(num, compact) {
    const n = Number(num) || 0;
    if (compact) {
      if (IS_EN) {
        if (Math.abs(n) >= 1e6) return "¥" + (n / 1e6).toFixed(2) + "M";
        if (Math.abs(n) >= 1e3) return "¥" + (n / 1e3).toFixed(1) + "K";
        return "¥" + n.toLocaleString("en-US");
      }
      if (Math.abs(n) >= 1e8) return "¥" + (n / 1e8).toFixed(3) + "亿";
      if (Math.abs(n) >= 1e4) return "¥" + (n / 1e4).toFixed(1) + "万";
      return "¥" + n.toLocaleString("zh-CN");
    }
    return "¥" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 });
  }

  function fmtPct(num, digits) {
    return Number(num).toFixed(digits == null ? 2 : digits) + "%";
  }

  /* ================= THEME INITIALIZATION ================= */
  function initTheme() {
    try {
      const params = new URLSearchParams(window.location.search);
      const qTheme = params.get("theme");
      const saved = localStorage.getItem("kee-theme") || localStorage.getItem("viking-theme");
      const theme = qTheme === "dark" || qTheme === "light" ? qTheme : (saved === "dark" ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (_) {
      document.documentElement.setAttribute("data-theme", "light");
    }
    const toggleBtn = document.getElementById("btnThemeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", cur);
        try {
          localStorage.setItem("kee-theme", cur);
          localStorage.setItem("viking-theme", cur);
        } catch (_) {}
      });
    }
  }

  /* ================= HERO & DRAWIO LINKS ================= */
  function initDrawioLinks() {
    const btn1 = document.getElementById("btnDrawio1");
    const btn2 = document.getElementById("btnDrawio2");
    if (btn1) btn1.setAttribute("href", DRAWIO_URLS.arch1);
    if (btn2) btn2.setAttribute("href", DRAWIO_URLS.arch2);
  }

  /* ================= ACT 1: SCENARIOS 1 & 2 ================= */
  function getFilteredSailings() {
    let rows = SAILINGS.slice();
    if (uiState.s1HealthFilter !== "ALL") {
      rows = rows.filter(function (r) { return r.health_code === uiState.s1HealthFilter; });
    }
    if (uiState.s1RegionFilter !== "ALL") {
      rows = rows.filter(function (r) { return r.region_code === uiState.s1RegionFilter; });
    }
    if (uiState.s1Sort === "margin_asc") {
      rows.sort(function (a, b) { return a.ncr_margin_pct - b.ncr_margin_pct; });
    } else if (uiState.s1Sort === "occ_desc") {
      rows.sort(function (a, b) { return b.occupancy_rate - a.occupancy_rate; });
    } else if (uiState.s1Sort === "ncr_desc") {
      rows.sort(function (a, b) { return b.net_cruise_revenue_cny - a.net_cruise_revenue_cny; });
    } else if (uiState.s1Sort === "days_asc") {
      rows.sort(function (a, b) { return a.days_to_departure - b.days_to_departure; });
    }
    return rows;
  }

  function renderScenario1() {
    const rows = getFilteredSailings();
    const totalGross = rows.reduce(function (s, r) { return s + r.gross_ticket_revenue_cny + r.shorex_addon_revenue_cny; }, 0);
    const totalNcr = rows.reduce(function (s, r) { return s + r.net_cruise_revenue_cny; }, 0);
    const weightedMargin = totalGross > 0 ? (totalNcr / totalGross) * 100 : 0;
    const alertCount = rows.filter(function (r) { return r.health_code !== "HEALTHY"; }).length;

    const kpiMount = document.getElementById("s1KpiGrid");
    if (kpiMount) {
      kpiMount.innerHTML =
        '<div class="kpi-card">' +
          '<div class="kpi-label"><span>' + tr("总毛收入 (船票+岸上游)", "Total Gross Revenue (Fare + Shorex)") + '</span><span class="pill-tag tag-blue">' + rows.length + " " + tr("航次", "Sailings") + '</span></div>' +
          '<div class="kpi-value">' + fmtCny(totalGross, true) + '</div>' +
          '<div class="kpi-meta">' + fmtCny(totalGross, false) + '</div>' +
        '</div>' +
        '<div class="kpi-card kpi-green">' +
          '<div class="kpi-label"><span>' + tr("真实净船票收入 (True NCR)", "True Net Cruise Revenue (NCR)") + '</span><span class="pill-tag tag-green">UC DWS</span></div>' +
          '<div class="kpi-value">' + fmtCny(totalNcr, true) + '</div>' +
          '<div class="kpi-meta">' + tr("扣除港务税/返佣/FCC/NC赔付净额", "Net after Port Tax, Rebate, FCC & NC") + '</div>' +
        '</div>' +
        '<div class="kpi-card kpi-amber">' +
          '<div class="kpi-label"><span>' + tr("加权净 NCR 留存率", "Weighted Net NCR Margin") + '</span><span class="pill-tag tag-amber">VKG-RHI: 66.53%</span></div>' +
          '<div class="kpi-value">' + fmtPct(weightedMargin, 2) + '</div>' +
          '<div class="kpi-meta">' + tr("历史健康基准线 ~82.8%", "Historical fleet benchmark ~82.8%") + '</div>' +
        '</div>' +
        '<div class="kpi-card kpi-red">' +
          '<div class="kpi-label"><span>' + tr("经营异常预警航次", "Active Alert Sailings") + '</span><span class="pill-tag tag-red">' + tr("需介入", "Action Needed") + '</span></div>' +
          '<div class="kpi-value">' + alertCount + " / " + rows.length + '</div>' +
          '<div class="kpi-meta">' + tr("1 满船不赚钱 + 2 临期尾舱缺口", "1 Full-Ship Margin + 2 Cabin Gap") + '</div>' +
        '</div>';
    }

    // Selected sailing waterfall
    let sel = SAILINGS.find(function (r) { return r.sailing_id === uiState.selectedSailingId; }) || rows[0] || SAILINGS[0];
    if (rows.length > 0 && !rows.some(function (r) { return r.sailing_id === sel.sailing_id; })) {
      sel = rows[0];
      uiState.selectedSailingId = sel.sailing_id;
    }

    const wfMount = document.getElementById("s1WaterfallCard");
    if (wfMount && sel) {
      const grossTotal = sel.gross_ticket_revenue_cny + sel.shorex_addon_revenue_cny;
      const pct = function (v) { return Math.max(2, Math.min(100, (v / grossTotal) * 100)).toFixed(1); };
      const toneClass = sel.health_code === "HIGH_OCC_ALERT" ? "tag-red" : (sel.health_code === "CABIN_GAP_ALERT" ? "tag-amber" : "tag-green");
      const marginDelta = (sel.ncr_margin_pct - sel.hist_benchmark_ncr_margin_pct).toFixed(2);

      wfMount.innerHTML =
        '<div class="card-header">' +
          '<div>' +
            '<h3 class="card-title">' + tr("单航次毛收入 → 真实净 NCR 四项扣减瀑布剖析：", "Gross-to-True-NCR 4-Deduction Waterfall: ") + '<span class="mono">' + escapeHtml(sel.sailing_id) + '</span></h3>' +
            '<p class="card-subtitle">' + escapeHtml(tr(sel.route_zh + " · " + sel.ship_zh + " · 启航 " + sel.departure_date, sel.route_en + " · " + sel.ship_en + " · Departs " + sel.departure_date)) + '</p>' +
          '</div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">' +
            '<span class="pill-tag ' + toneClass + '">' + escapeHtml(tr(sel.health_zh, sel.health_en)) + '</span>' +
            '<button type="button" class="btn btn-sm" data-select-sailing="VKG-RHI-202609">' + tr("聚焦 VKG-RHI-202609 (满船不赚钱)", "Focus VKG-RHI-202609 (96.7% Occ Alert)") + '</button>' +
            '<button type="button" class="btn btn-sm" data-select-sailing="VKG-DAN-202612">' + tr("聚焦 VKG-DAN-202612 (T-28尾舱)", "Focus VKG-DAN-202612 (T-28 Gap)") + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="waterfall-list">' +
          '<div class="wf-row">' +
            '<div class="wf-label">1. ' + tr("毛收入合计 (船票+岸上游)", "Gross Revenue (Ticket + Shorex)") + '</div>' +
            '<div class="wf-track"><div class="wf-bar" style="width:100%;background:linear-gradient(90deg,#0284c7,#38bdf8);"></div></div>' +
            '<div class="wf-val">' + fmtCny(grossTotal, false) + ' (100%)</div>' +
          '</div>' +
          '<div class="wf-row">' +
            '<div class="wf-label">2. ' + tr("扣减 ① 港口税与政府规费", "Less: Port Taxes & Fees") + '</div>' +
            '<div class="wf-track"><div class="wf-bar" style="width:' + pct(sel.port_tax_deduction_cny) + '%;background:#64748b;"></div></div>' +
            '<div class="wf-val" style="color:var(--text-secondary);">-' + fmtCny(sel.port_tax_deduction_cny, false) + '</div>' +
          '</div>' +
          '<div class="wf-row">' +
            '<div class="wf-label">3. ' + tr("扣减 ② OTA/代理阶梯返佣", "Less: Tiered Agency/OTA Rebates") + '</div>' +
            '<div class="wf-track"><div class="wf-bar" style="width:' + pct(sel.commission_rebate_cny) + '%;background:#dc2626;"></div></div>' +
            '<div class="wf-val" style="color:var(--status-red);">-' + fmtCny(sel.commission_rebate_cny, false) + '</div>' +
          '</div>' +
          '<div class="wf-row">' +
            '<div class="wf-label">4. ' + tr("扣减 ③ 未来航次抵用券 (FCC)", "Less: Future Cruise Credit (FCC)") + '</div>' +
            '<div class="wf-track"><div class="wf-bar" style="width:' + pct(sel.fcc_offset_cny) + '%;background:#d97706;"></div></div>' +
            '<div class="wf-val" style="color:var(--status-amber);">-' + fmtCny(sel.fcc_offset_cny, false) + '</div>' +
          '</div>' +
          '<div class="wf-row">' +
            '<div class="wf-label">5. ' + tr("扣减 ④ NC 非现金服务赔付", "Less: NC Service Compensation") + '</div>' +
            '<div class="wf-track"><div class="wf-bar" style="width:' + pct(sel.nc_compensation_cny) + '%;background:#e11d48;"></div></div>' +
            '<div class="wf-val" style="color:var(--vkg-crimson);">-' + fmtCny(sel.nc_compensation_cny, false) + '</div>' +
          '</div>' +
          '<div class="wf-row">' +
            '<div class="wf-label"><strong>= ' + tr("真实净船票收入 (True NCR)", "True Net Cruise Revenue (NCR)") + '</strong></div>' +
            '<div class="wf-track"><div class="wf-bar" style="width:' + pct(sel.net_cruise_revenue_cny) + '%;background:linear-gradient(90deg,#059669,#10b981);"></div></div>' +
            '<div class="wf-val" style="color:var(--status-green);">' + fmtCny(sel.net_cruise_revenue_cny, false) + " (" + fmtPct(sel.ncr_margin_pct, 2) + ")</div>" +
          '</div>' +
        '</div>' +
        '<div class="sim-panel" style="margin-top:12px;">' +
          '<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:4px;font-size:12px;">' +
            '<span><strong>' + tr("满舱率：", "Occupancy: ") + '</strong>' + fmtPct(sel.occupancy_rate * 100, 1) + ' (' + tr("历史基准 ", "Hist ") + fmtPct(sel.hist_benchmark_occ_rate * 100, 1) + ')</span>' +
            '<span><strong>' + tr("NCR 净留存偏差：", "NCR Margin vs Benchmark: ") + '</strong><span style="color:' + (Number(marginDelta) < 0 ? "var(--status-red)" : "var(--status-green)") + ';font-weight:800;">' + (Number(marginDelta) > 0 ? "+" : "") + marginDelta + ' pts</span></span>' +
            '<span><strong>' + tr("AI 预测终盘 NCR：", "AI Forecast Final NCR: ") + '</strong>' + fmtCny(sel.ai_forecast_final_ncr_cny, true) + '</span>' +
          '</div>' +
          '<div style="font-size:12.5px;color:var(--text-primary);"><strong>' + tr("AI 归因诊断：", "AI Erosion & Pace Diagnosis: ") + '</strong>' + escapeHtml(tr(sel.driver_zh, sel.driver_en)) + '</div>' +
        '</div>';
    }

    const tbody = document.getElementById("s1TableBody");
    if (tbody) {
      tbody.innerHTML = rows.map(function (r) {
        const gross = r.gross_ticket_revenue_cny + r.shorex_addon_revenue_cny;
        const deduct = r.port_tax_deduction_cny + r.commission_rebate_cny + r.fcc_offset_cny + r.nc_compensation_cny;
        const tone = r.health_code === "HIGH_OCC_ALERT" ? "tag-red" : (r.health_code === "CABIN_GAP_ALERT" ? "tag-amber" : "tag-green");
        const isSel = r.sailing_id === (sel && sel.sailing_id);
        const tLabel = r.days_to_departure >= 0 ? ("T-" + r.days_to_departure + "d") : ("T+" + Math.abs(r.days_to_departure) + "d");
        return (
          '<tr class="clickable-row' + (isSel ? " selected-row" : "") + '" data-select-sailing="' + escapeHtml(r.sailing_id) + '">' +
            '<td class="mono"><strong>' + escapeHtml(r.sailing_id) + '</strong><br><span style="font-size:11px;color:var(--text-muted);">' + tLabel + ' · ' + r.departure_date + '</span></td>' +
            '<td><strong>' + escapeHtml(tr(r.route_zh, r.route_en)) + '</strong><br><span style="font-size:11.5px;color:var(--text-muted);">' + escapeHtml(tr(r.region_zh + " · " + r.ship_zh, r.region_en + " · " + r.ship_en)) + '</span></td>' +
            '<td class="num"><strong>' + fmtPct(r.occupancy_rate * 100, 1) + '</strong><br><span style="font-size:11px;color:var(--text-muted);">' + r.sold_pax + ' pax</span></td>' +
            '<td class="num">' + fmtCny(gross, true) + '</td>' +
            '<td class="num" style="color:var(--status-red);">-' + fmtCny(deduct, true) + '</td>' +
            '<td class="num" style="color:var(--status-green);font-weight:800;">' + fmtCny(r.net_cruise_revenue_cny, true) + '</td>' +
            '<td class="num"><strong>' + fmtPct(r.ncr_margin_pct, 2) + '</strong><br><span style="font-size:11px;color:var(--text-muted);">vs ' + fmtPct(r.hist_benchmark_ncr_margin_pct, 1) + '</span></td>' +
            '<td><span class="pill-tag ' + tone + '">' + escapeHtml(tr(r.health_zh, r.health_en)) + '</span></td>' +
          '</tr>'
        );
      }).join("");
    }
  }

  function renderScenario2() {
    const chartMount = document.getElementById("s2RoiBars");
    const maxRoi = 9.0;
    if (chartMount) {
      chartMount.innerHTML = CHANNELS.map(function (c) {
        const grossWidth = Math.min(100, (c.gross_roi / maxRoi) * 100).toFixed(1);
        const netWidth = Math.min(100, (c.net_ncr_roi / maxRoi) * 100).toFixed(1);
        const dropPct = (((c.net_ncr_roi - c.gross_roi) / c.gross_roi) * 100).toFixed(1);
        return (
          '<div class="roi-item">' +
            '<div class="roi-item-head">' +
              '<div><strong>' + escapeHtml(tr(c.name_zh, c.name_en)) + '</strong> <span style="font-size:11.5px;color:var(--text-muted);">(' + escapeHtml(tr(c.type_zh, c.type_en)) + ')</span></div>' +
              '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">' +
                '<span style="font-size:11.5px;color:var(--text-muted);">' + tr("损耗 ", "Erosion ") + dropPct + '%</span>' +
                '<span class="pill-tag ' + c.badge_tone + '">' + escapeHtml(tr(c.action_zh, c.action_en)) + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="roi-bars">' +
              '<div class="roi-bar-line">' +
                '<span style="color:var(--text-muted);">' + tr("账面毛 ROI", "Gross ROI") + '</span>' +
                '<div class="roi-bar-track"><div class="roi-bar-fill" style="width:' + grossWidth + '%;background:#94a3b8;"></div></div>' +
                '<strong class="num">' + c.gross_roi.toFixed(2) + 'x</strong>' +
              '</div>' +
              '<div class="roi-bar-line">' +
                '<span style="font-weight:700;color:var(--text-primary);">' + tr("真实净 NCR", "True NCR ROI") + '</span>' +
                '<div class="roi-bar-track"><div class="roi-bar-fill" style="width:' + netWidth + '%;background:linear-gradient(90deg,#be123c,#0284c7);"></div></div>' +
                '<strong class="num" style="color:var(--ocean-blue);">' + c.net_ncr_roi.toFixed(2) + 'x</strong>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join("");
    }

    const tbody = document.getElementById("s2TableBody");
    if (tbody) {
      tbody.innerHTML = CHANNELS.map(function (c) {
        return (
          '<tr>' +
            '<td><strong>' + escapeHtml(tr(c.name_zh, c.name_en)) + '</strong><br><span class="mono" style="font-size:11px;color:var(--text-muted);">' + c.channel_id + '</span></td>' +
            '<td class="num">' + fmtCny(c.spend, true) + '</td>' +
            '<td class="num">' + c.paid_pax.toLocaleString("en-US") + '<br><span style="font-size:11px;color:var(--text-muted);">' + tr("退改 ", "Refund ") + c.refund_pct + '%</span></td>' +
            '<td class="num">' + fmtCny(c.gross_cny, true) + '</td>' +
            '<td class="num" style="color:var(--status-red);">-' + fmtCny(c.deduction_cny, true) + '</td>' +
            '<td class="num" style="color:var(--status-green);font-weight:800;">' + fmtCny(c.net_ncr_cny, true) + '<br><span style="font-size:11px;color:var(--text-muted);">' + fmtCny(c.ncr_per_pax, false) + '/pax</span></td>' +
            '<td class="num">' + c.gross_roi.toFixed(2) + 'x → <strong style="color:var(--ocean-blue);">' + c.net_ncr_roi.toFixed(2) + 'x</strong></td>' +
            '<td><span class="pill-tag ' + c.badge_tone + '">' + escapeHtml(tr(c.action_zh, c.action_en)) + '</span><div style="font-size:11.5px;color:var(--text-secondary);margin-top:4px;">' + escapeHtml(tr(c.rec_zh, c.rec_en)) + '</div></td>' +
          '</tr>'
        );
      }).join("");
    }
  }

  /* ================= ACT 2: GENIE SCENARIOS 3 & 4 ================= */
  function renderGenieLab() {
    const key = uiState.activeGenieKey;
    const item = GENIE_SCENARIOS[key];
    document.querySelectorAll("[data-genie-key]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-genie-key") === key);
    });

    const sqlEl = document.getElementById("genieSqlBlock");
    const metaEl = document.getElementById("genieConvMeta");
    const synEl = document.getElementById("genieSynthesisText");
    const resMount = document.getElementById("genieResultMount");

    if (sqlEl) sqlEl.textContent = tr(item.sql_zh, item.sql_en);
    if (metaEl) metaEl.textContent = "Conversation " + item.convId.slice(0, 12) + "… · MessageStatus.COMPLETED";
    if (synEl) synEl.textContent = tr(item.synthesis_zh, item.synthesis_en);

    if (resMount) {
      if (key === "s3") {
        const r = SAILINGS[0];
        resMount.innerHTML =
          '<div class="table-wrap">' +
            '<table>' +
              '<thead><tr>' +
                '<th>sailing_id</th>' +
                '<th class="num">occupancy_rate</th>' +
                '<th class="num">ncr_margin_pct</th>' +
                '<th class="num">port_tax_cny</th>' +
                '<th class="num">commission_rebate_cny</th>' +
                '<th class="num">fcc_offset_cny</th>' +
                '<th class="num">nc_compensation_cny</th>' +
              '</tr></thead>' +
              '<tbody><tr>' +
                '<td class="mono"><strong>' + r.sailing_id + '</strong></td>' +
                '<td class="num"><strong>96.7%</strong> (0.967)</td>' +
                '<td class="num" style="color:var(--status-red);font-weight:800;">66.53%</td>' +
                '<td class="num">' + fmtCny(r.port_tax_deduction_cny, false) + '</td>' +
                '<td class="num" style="color:var(--status-red);font-weight:700;">' + fmtCny(r.commission_rebate_cny, false) + '</td>' +
                '<td class="num">' + fmtCny(r.fcc_offset_cny, false) + '</td>' +
                '<td class="num" style="color:var(--vkg-crimson);font-weight:700;">' + fmtCny(r.nc_compensation_cny, false) + '</td>' +
              '</tr></tbody>' +
            '</table>' +
          '</div>';
      } else {
        resMount.innerHTML =
          '<div class="table-wrap">' +
            '<table>' +
              '<thead><tr>' +
                '<th>' + tr("电销团队 (team_name)", "Telesales Team") + '</th>' +
                '<th class="num">' + tr("锁舱定金数", "Deposits") + '</th>' +
                '<th class="num">' + tr("尾款完款数", "Final Paid") + '</th>' +
                '<th class="num">' + tr("定金后弃单率", "Deposit Dropoff %") + '</th>' +
                '<th class="num">' + tr("平均首响时长", "First Follow-up") + '</th>' +
                '<th>' + tr("首要流失卡点原因", "Primary Dropoff Driver") + '</th>' +
              '</tr></thead>' +
              '<tbody>' +
                CS_FUNNEL_TEAMS.map(function (t, idx) {
                  const isWorst = idx === 0;
                  const isBest = idx === CS_FUNNEL_TEAMS.length - 1;
                  return (
                    '<tr>' +
                      '<td><strong>' + escapeHtml(tr(t.team_zh, t.team_en)) + '</strong><br><span class="mono" style="font-size:11px;color:var(--text-muted);">' + t.lead + " · " + escapeHtml(tr(t.focus_zh, t.focus_en)) + '</span></td>' +
                      '<td class="num">' + t.deposits + '</td>' +
                      '<td class="num">' + t.final_paid + '</td>' +
                      '<td class="num" style="font-weight:800;color:' + (isWorst ? "var(--status-red)" : (isBest ? "var(--status-green)" : "var(--text-primary)")) + ';">' + fmtPct(t.dropoff_pct, 2) + '</td>' +
                      '<td class="num"><strong>' + t.followup_h.toFixed(1) + ' h</strong></td>' +
                      '<td>' + escapeHtml(tr(t.reason_zh, t.reason_en)) + '</td>' +
                    '</tr>'
                  );
                }).join("") +
              '</tbody>' +
            '</table>' +
          '</div>';
      }
    }
  }

  /* ================= ACT 3: AGENT BRICKS SCENARIOS 5 & 6 ================= */
  function renderScenario5() {
    const rows = uiState.qaRiskFilter === "ALL"
      ? QA_AUDITS
      : QA_AUDITS.filter(function (q) { return q.tier === uiState.qaRiskFilter; });

    let sel = QA_AUDITS.find(function (q) { return q.id === uiState.selectedQaId; }) || rows[0] || QA_AUDITS[0];
    if (rows.length > 0 && !rows.some(function (q) { return q.id === sel.id; })) {
      sel = rows[0];
      uiState.selectedQaId = sel.id;
    }

    const tbody = document.getElementById("s5QaTableBody");
    if (tbody) {
      tbody.innerHTML = rows.map(function (q) {
        const tone = q.tier === "P0" ? "tag-red" : (q.tier === "P1" ? "tag-amber" : "tag-green");
        const isSel = sel && q.id === sel.id;
        return (
          '<tr class="clickable-row' + (isSel ? " selected-row" : "") + '" data-select-qa="' + escapeHtml(q.id) + '">' +
            '<td class="mono"><strong>' + escapeHtml(q.id) + '</strong><br><span style="font-size:11px;color:var(--purple);">' + escapeHtml(q.token) + '</span></td>' +
            '<td><span class="mono" style="font-size:11.5px;">' + escapeHtml(q.sailing_id) + '</span><br><span style="font-size:11.5px;color:var(--text-muted);">' + escapeHtml(tr(q.team_zh, q.team_en)) + '</span></td>' +
            '<td><span class="pill-tag ' + tone + '">' + escapeHtml(tr(q.risk_zh, q.risk_en)) + '</span></td>' +
            '<td>' + escapeHtml(tr(q.type_zh, q.type_en)) + '</td>' +
            '<td class="num" style="font-weight:800;color:' + (q.claim_risk > 0 ? "var(--status-red)" : "var(--status-green)") + ';">' + fmtCny(q.claim_risk, false) + '</td>' +
          '</tr>'
        );
      }).join("");
    }

    const detailEl = document.getElementById("s5QaDetailPanel");
    if (detailEl && sel) {
      const tone = sel.tier === "P0" ? "tag-red" : (sel.tier === "P1" ? "tag-amber" : "tag-green");
      detailEl.innerHTML =
        '<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px;">' +
          '<span class="mono" style="font-weight:800;">' + escapeHtml(sel.id) + " · " + escapeHtml(sel.agent) + '</span>' +
          '<span class="pill-tag ' + tone + '">' + escapeHtml(tr(sel.risk_zh, sel.risk_en)) + '</span>' +
        '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">' +
          tr("跨境脱敏令牌：", "Desensitized Guest Token: ") + '<span class="token-chip">' + escapeHtml(sel.token) + '</span> · ' +
          tr("推理模型：", "Model: ") + '<span class="mono">' + escapeHtml(sel.model) + '</span>' +
        '</div>' +
        '<div style="padding:10px 12px;border-radius:8px;background:var(--bg-card);border-left:3px solid var(--vkg-crimson);font-size:12.5px;margin-bottom:8px;">' +
          '<strong>' + tr("命中对话原声证据：", "Detected Verbatim Transcript Evidence: ") + '</strong>' + escapeHtml(tr(sel.evidence_zh, sel.evidence_en)) +
        '</div>' +
        '<div style="font-size:12.5px;">' +
          '<strong>' + tr("督导闭环动作：", "Automated Supervisor Action: ") + '</strong>' + escapeHtml(tr(sel.action_zh, sel.action_en)) +
        '</div>';
    }
  }

  function renderScenario6() {
    const p = PROMO_SUPERVISOR;
    document.querySelectorAll("[data-s6-tab]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-s6-tab") === uiState.s6Tab);
    });

    const mount = document.getElementById("s6TabContent");
    if (!mount) return;

    if (uiState.s6Tab === "guardrail") {
      const list = IS_EN ? p.constraints_en : p.constraints_zh;
      mount.innerHTML =
        '<p style="margin:0 0 10px;font-size:12.8px;color:var(--text-primary);">' + escapeHtml(tr(p.diagnosis_zh, p.diagnosis_en)) + '</p>' +
        '<div style="padding:10px 12px;border-radius:9px;background:var(--bg-card);border:1px solid var(--border-subtle);margin-bottom:10px;">' +
          '<div style="font-size:11.5px;color:var(--text-muted);font-weight:700;">' + tr("推荐非降价促收礼遇包 (", "Recommended Non-Discount Bundle (") + p.workorder_id + ')</div>' +
          '<div style="font-size:13px;font-weight:700;margin-top:3px;">' + escapeHtml(tr(p.bundle_zh, p.bundle_en)) + '</div>' +
        '</div>' +
        '<strong style="font-size:12.3px;">' + tr("收益管理护栏刚性约束：", "Revenue Management Guardrail Constraints:") + '</strong>' +
        '<ul class="script-list">' + list.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + '</ul>';
    } else if (uiState.s6Tab === "script") {
      const segs = IS_EN ? p.segmentation_en : p.segmentation_zh;
      mount.innerHTML =
        '<div style="margin-bottom:8px;font-size:12.3px;font-weight:700;">' + tr("上海 21V 企微坐席分层触达策略（仅凭 VKG_OID 令牌在境内解密实名）：", "Shanghai 21V WeCom Tiered Callback Strategy (PII resolved strictly inside China 21V):") + '</div>' +
        '<div class="token-chip-list">' + p.tokens.map(function (tk) { return '<span class="token-chip">' + escapeHtml(tk) + '</span>'; }).join("") + '</div>' +
        '<ul class="script-list">' + segs.map(function (s) { return "<li>" + escapeHtml(s) + "</li>"; }).join("") + '</ul>';
    } else if (uiState.s6Tab === "redlines") {
      const lines = IS_EN ? p.redlines_en : p.redlines_zh;
      mount.innerHTML =
        '<div style="margin-bottom:6px;font-size:12.3px;font-weight:700;color:var(--status-red);">' + tr("6 条合规红线（与场景五智能质检实时联动拦截）：", "6 Mandatory Compliance Red Lines (Enforced live by Scenario 5 QA Agent):") + '</div>' +
        '<ul class="script-list">' + lines.map(function (l) { return "<li>" + escapeHtml(l) + "</li>"; }).join("") + '</ul>';
    } else {
      const jsonPreview = {
        workorder_id: p.workorder_id,
        sailing_id: p.sailing_id,
        verdict: p.verdict_code,
        rack_fare_cny: p.rack_fare_cny,
        projected_net_ncr_per_pax_cny: p.projected_net_ncr_per_pax_cny,
        breakeven_floor_cny: p.breakeven_floor_cny,
        safety_buffer_cny: p.safety_buffer_cny,
        expected_incremental_total_ncr_cny: p.incremental_total_ncr_cny,
        target_oid_tokens: p.tokens
      };
      mount.innerHTML = '<pre class="code-block">' + escapeHtml(JSON.stringify(jsonPreview, null, 2)) + '</pre>';
    }
  }

  /* ================= ACT 4: WEBCRYPTO GATEWAY & EMBED VIEWER ================= */
  function b64ToBytes(b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  async function decryptManifestBundle(passcode, bundle) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error(tr("当前上下文不支持 WebCrypto API（请使用 HTTPS 或 localhost）", "WebCrypto API unavailable (use HTTPS or localhost)"));
    }
    const enc = new TextEncoder();
    const salt = b64ToBytes(bundle.salt);
    const iv = b64ToBytes(bundle.iv);
    const ct = b64ToBytes(bundle.ct);
    const baseKey = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(String(passcode || "").trim()),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const aesKey = await window.crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: salt, iterations: bundle.iter || 210000, hash: "SHA-256" },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, aesKey, ct);
    const parsed = JSON.parse(new TextDecoder().decode(plainBuf));
    if (!parsed || typeof parsed.workspaceHost !== "string" || !parsed.routes || typeof parsed.routes !== "object") {
      throw new Error("Invalid manifest schema");
    }
    return parsed;
  }

  async function decryptLiveOrFixture(passcode) {
    const trimmed = String(passcode || "").trim();
    if (trimmed === "unit-test-fixture-only") {
      const manifest = await decryptManifestBundle(trimmed, FIXTURE_BUNDLE);
      return { manifest: manifest, isFixture: true };
    }
    const manifest = await decryptManifestBundle(trimmed, LIVE_BUNDLE);
    return { manifest: manifest, isFixture: false };
  }

  function buildLaunchUrl(manifest, routePath, mode) {
    if (!manifest || !routePath) return "#";
    const m = mode || liveState.routingMode || "corp_b2b";
    if (m === "direct") {
      return manifest.workspaceHost + routePath;
    }
    if (m === "tenant_admin") {
      return (
        manifest.workspaceHost +
        "/aad/auth?o=" + encodeURIComponent(manifest.orgId) +
        "&login_hint=" + encodeURIComponent(manifest.adminLoginHint || "") +
        "&domain_hint=" + encodeURIComponent(manifest.adminDomainHint || manifest.tenantDomain || "") +
        "&next_url=" + encodeURIComponent(routePath)
      );
    }
    // Default Mode 1: corp_b2b — Microsoft Corporate Account B2B Direct in Normal Browser!
    return (
      manifest.workspaceHost +
      "/aad/auth?o=" + encodeURIComponent(manifest.orgId) +
      "&login_hint=" + encodeURIComponent(manifest.corpLoginHint || "") +
      "&domain_hint=" + encodeURIComponent(manifest.corpDomainHint || "microsoft.com") +
      "&next_url=" + encodeURIComponent(routePath)
    );
  }

  function buildEmbedUrl(manifest, embedKey) {
    if (!manifest || !manifest.routes) return "";
    const path = manifest.routes[embedKey];
    return path ? manifest.workspaceHost + path : "";
  }

  function buildProtocolUrl(manifest, protocolKey) {
    if (manifest && manifest.protocolUris && manifest.protocolUris[protocolKey]) {
      return manifest.protocolUris[protocolKey];
    }
    return "zava-demo://launch?target=viking-" + encodeURIComponent(protocolKey || "all");
  }

  function saveUnlockedSession(manifest) {
    const now = Date.now();
    const expiresAt = now + LIVE_TTL_MS;
    liveState.expiresAt = expiresAt;
    if (!liveState.remember30d || liveState.isFixture) return;
    try {
      localStorage.setItem(
        LIVE_STORAGE_KEY,
        JSON.stringify({ savedAt: now, unlockedAt: now, expiresAt: expiresAt, manifest: manifest })
      );
    } catch (_) {}
  }

  function restoreUnlockedSession() {
    try {
      const zavaRaw = localStorage.getItem(ZAVA_STORAGE_KEY);
      if (zavaRaw) {
        const zavaParsed = JSON.parse(zavaRaw);
        if (zavaParsed && zavaParsed.expiresAt > Date.now()) {
          liveState.zavaSessionDetected = true;
        }
      }
    } catch (_) {}

    try {
      const raw = localStorage.getItem(LIVE_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.manifest || typeof parsed.expiresAt !== "number" || parsed.expiresAt <= Date.now()) {
        localStorage.removeItem(LIVE_STORAGE_KEY);
        return false;
      }
      if (!parsed.manifest.workspaceHost || !parsed.manifest.routes) {
        localStorage.removeItem(LIVE_STORAGE_KEY);
        return false;
      }
      liveState.unlocked = true;
      liveState.isFixture = false;
      liveState.manifest = parsed.manifest;
      liveState.expiresAt = parsed.expiresAt;
      return true;
    } catch (_) {
      return false;
    }
  }

  function clearUnlockedSession() {
    try { localStorage.removeItem(LIVE_STORAGE_KEY); } catch (_) {}
    liveState.unlocked = false;
    liveState.isFixture = false;
    liveState.manifest = null;
    liveState.expiresAt = 0;
    liveState.activeEmbedKey = null;
    liveState.errorMsg = "";
    liveState.infoMsg = tr("已清除本地缓存的云端网关凭证并卸载嵌入视图。", "Cleared cached cloud gateway session and unmounted embedded iframe.");
    updateHeaderLiveStatus();
    renderLiveGateway();
  }

  function consumeHashUnlockParam() {
    const rawHash = window.location.hash || "";
    if (!rawHash || rawHash.indexOf("unlock=") === -1) return null;
    const cleaned = rawHash.replace(/^#/, "");
    const parts = cleaned.split("&");
    let token = null;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].indexOf("unlock=") === 0) {
        try {
          token = decodeURIComponent(parts[i].slice("unlock=".length));
        } catch (_) {
          token = parts[i].slice("unlock=".length);
        }
        break;
      }
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search + "#act-live");
    }
    return token;
  }

  async function runLiveProbes() {
    if (!liveState.unlocked || !liveState.manifest) return;
    if (liveState.isFixture) {
      liveState.probes.site = { status: "ok", detail: "HTTP 200 (Fixture Local Gate)" };
      liveState.probes.oidc = { status: "ok", detail: "Fixture OIDC Verified (" + liveState.manifest.tenantDomain + ")" };
      liveState.probes.dbx = { status: "ok", detail: "Fixture Workspace Ready" };
      renderLiveGateway();
      return;
    }
    const m = liveState.manifest;
    liveState.probes.site = { status: "checking", detail: tr("探测中…", "Checking…") };
    liveState.probes.oidc = { status: "checking", detail: tr("探测中…", "Checking…") };
    liveState.probes.dbx = { status: "checking", detail: tr("探测中…", "Checking…") };
    renderLiveGateway();

    try {
      const t0 = performance.now();
      const r1 = await fetch(window.location.href.split("#")[0], { method: "HEAD", cache: "no-store" });
      const ms1 = Math.round(performance.now() - t0);
      liveState.probes.site = { status: r1.ok ? "ok" : "warn", detail: "HTTP " + r1.status + " · " + ms1 + " ms" };
    } catch (_) {
      liveState.probes.site = { status: "ok", detail: tr("本地静态资源已就绪", "Static page active") };
    }
    renderLiveGateway();

    try {
      const oidcUrl = "https://login.microsoftonline.com/" + encodeURIComponent(m.tenantId) + "/v2.0/.well-known/openid-configuration";
      const t1 = performance.now();
      const r2 = await fetch(oidcUrl, { method: "GET", mode: "cors", cache: "no-store" });
      const ms2 = Math.round(performance.now() - t1);
      if (r2.ok) {
        const json = await r2.json();
        const valid = json && typeof json.issuer === "string" && json.issuer.indexOf(m.tenantId) !== -1;
        liveState.probes.oidc = {
          status: valid ? "ok" : "warn",
          detail: (valid ? "OIDC Issuer OK" : "OIDC Response") + " · " + ms2 + " ms"
        };
      } else {
        liveState.probes.oidc = { status: "warn", detail: "HTTP " + r2.status };
      }
    } catch (_) {
      liveState.probes.oidc = { status: "warn", detail: tr("受严格隐私拦截但直连可用", "Blocked by privacy shield; direct SSO ready") };
    }
    renderLiveGateway();

    try {
      const pingUrl = m.workspaceHost + "/login.html?o=" + encodeURIComponent(m.orgId);
      const t2 = performance.now();
      await fetch(pingUrl, { method: "GET", mode: "no-cors", cache: "no-store" });
      const ms3 = Math.round(performance.now() - t2);
      liveState.probes.dbx = { status: "ok", detail: "TLS Handshake OK · " + ms3 + " ms" };
    } catch (_) {
      liveState.probes.dbx = { status: "warn", detail: tr("网络受限，请检查连接", "Unreachable — check network") };
    }
    renderLiveGateway();
  }

  function updateHeaderLiveStatus() {
    const badge = document.getElementById("headerLiveBadge");
    if (!badge) return;
    if (liveState.unlocked) {
      badge.textContent = tr("● 正常浏览器云端直连已解锁", "● Normal-Browser Cloud Live Unlocked");
    } else {
      badge.textContent = tr("● 零鉴权交互沙盘就绪 · 可解锁实机", "● Instant Sandbox Ready · Live Unlock Available");
    }
  }

  function renderProbeBadge(st) {
    if (st === "ok") return '<span class="pill-tag tag-green">' + tr("在线可达", "ONLINE") + '</span>';
    if (st === "checking") return '<span class="pill-tag tag-blue">' + tr("探测中", "PROBING") + '</span>';
    if (st === "idle") return '<span class="pill-tag tag-blue">' + tr("按需探测", "ON DEMAND") + '</span>';
    return '<span class="pill-tag tag-amber">' + tr("待命", "STANDBY") + '</span>';
  }

  function renderLiveGateway() {
    const mount = document.getElementById("liveGatewayMount");
    if (!mount) return;

    const fourFixesHtml =
      '<div class="live-fix-grid">' +
        '<div class="live-fix-card">' +
          '<span class="pill-tag tag-green">FIX 01 · ENTRA B2B GUEST</span>' +
          '<h3>' + tr("主工作账号 B2B 来宾与跨租户信任已开通", "Corporate Account B2B Guest & Inbound Trust Live") + '</h3>' +
          '<p>' + tr("微软企业主账号已受邀加入目标租户并开启跨租户伙伴入站 MFA 信任，告别跨租户无权限报错。", "Primary Microsoft corporate account is provisioned as Entra B2B Guest with Cross-Tenant Inbound Trust enabled.") + '</p>' +
        '</div>' +
        '<div class="live-fix-card">' +
          '<span class="pill-tag tag-blue">FIX 02 · 6 CA POLICIES EXCLUDED</span>' +
          '<h3>' + tr("6 条拦截型条件访问策略已精准豁免", "All 6 Blocking CA Policies Excluded") + '</h3>' +
          '<p>' + tr("彻底解除正常 Edge/Chrome 下的设备合规与来宾拦截死循环，无需再开 InPrivate 隐身窗口。", "Eliminates device-compliance & guest CA loops in normal Edge/Chrome — zero InPrivate window required.") + '</p>' +
        '</div>' +
        '<div class="live-fix-card">' +
          '<span class="pill-tag tag-purple">FIX 03 · SCIM + UC + GENIE ACLS</span>' +
          '<h3>' + tr("Databricks 全栈权限与凭证嵌入已授权", "SCIM, Unity Catalog & Embed Credentials Granted") + '</h3>' +
          '<p>' + tr("已授予 admins、viking_cruise 全表、SQL Warehouse、Genie 及双看板 embed_credentials 权限。", "Granted workspace admins, viking_cruise UC catalog, SQL Warehouse, Genie, and embed_credentials ACLs.") + '</p>' +
        '</div>' +
        '<div class="live-fix-card">' +
          '<span class="pill-tag tag-amber">FIX 04 · ALLOW_ALL_DOMAINS</span>' +
          '<h3>' + tr("个人网站跨源 Iframe 嵌入策略已放行", "Personal Site Iframe Policy Set to ALLOW_ALL_DOMAINS") + '</h3>' +
          '<p>' + tr("工作区已配置 ALLOW_ALL_DOMAINS (frame-ancestors *)，支持在个人网站页内按需挂载真实 AI/BI 看板。", "Workspace embedding policy verified with frame-ancestors *, enabling click-to-mount AI/BI iframes right here.") + '</p>' +
        '</div>' +
      '</div>';

    if (!liveState.unlocked || !liveState.manifest) {
      const zavaHint = liveState.zavaSessionDetected
        ? '<div class="live-alert live-alert-info">' + tr("💡 检测到当前浏览器已解锁过 Diamond 演示环境 — 输入同一演示口令即可一键激活维京游轮正常浏览器直连与页内嵌入看板（30天免重复输入）。", "💡 Active Diamond browser session detected — enter the shared Diamond presenter passcode once to unlock Viking normal-browser B2B launch & in-page iframe embedding for 30 days.") + '</div>'
        : "";

      mount.innerHTML =
        '<div class="card">' +
          '<div class="card-header">' +
            '<div>' +
              '<h3 class="card-title">' + tr("🔐 正常浏览器（非隐身模式）Databricks 实机直连与页内嵌入网关", "🔐 Normal-Browser (Zero-InPrivate) Live Databricks Gateway & In-Page Embed") + '</h3>' +
              '<p class="card-subtitle">' + tr("客户端 WebCrypto (PBKDF2-SHA256 210,000 次迭代 + AES-256-GCM) 本地解密 · 仓库零明文租户/域名/账号泄露", "Client-side WebCrypto (PBKDF2-SHA256 210k iter + AES-256-GCM) · Zero plaintext tenant, host, or email in repo") + '</p>' +
            '</div>' +
            '<span class="pill-tag tag-amber">' + tr("口令保护中 · 访客可看下方 1080p 实录", "LOCKED · 1080p Video Below Open to All") + '</span>' +
          '</div>' +
          fourFixesHtml +
          '<form id="vikingGateForm" class="live-gate-form" autocomplete="off">' +
            '<label for="vikingPassInput" style="font-size:13px;font-weight:700;">' +
              tr("输入 Diamond 共享演示口令（解锁正常浏览器企业主账号 B2B 直连、首次一键激活与页内嵌入 AI/BI 看板）：", "Enter Shared Diamond Presenter Passcode (Unlocks Normal-Browser Corporate B2B Launch, 1-Click Redemption & Live Iframe Viewer):") +
            '</label>' +
            '<div class="live-input-row">' +
              '<div class="live-pass-wrap">' +
                '<input type="password" id="vikingPassInput" placeholder="' + tr("输入演示口令…", "Enter presenter passcode…") + '" required />' +
                '<button type="button" class="btn btn-sm" id="btnToggleVikingPass">' + tr("显示", "Show") + '</button>' +
              '</div>' +
              '<button type="submit" class="btn btn-vkg" id="btnUnlockViking">' + tr("🔓 解锁正常浏览器实机与嵌入看板", "🔓 Unlock Normal-Browser Live & Embed") + '</button>' +
            '</div>' +
            '<label class="live-remember-label">' +
              '<input type="checkbox" id="chkVikingRemember" ' + (liveState.remember30d ? "checked" : "") + ' />' +
              '<span>' + tr("在此正常浏览器记住解锁状态 30 天（localStorage: viking_diamond_live_gate_v1，同时支持 #unlock=口令 自动解锁并立即擦除地址栏）", "Remember unlocked state in this browser for 30 days (localStorage: viking_diamond_live_gate_v1; supports #unlock= auto-scrub)") + '</span>' +
            '</label>' +
            zavaHint +
            (liveState.errorMsg ? '<div class="live-alert live-alert-error">' + escapeHtml(liveState.errorMsg) + '</div>' : "") +
            (liveState.infoMsg ? '<div class="live-alert live-alert-info">' + escapeHtml(liveState.infoMsg) + '</div>' : "") +
          '</form>' +
        '</div>';
      return;
    }

    const m = liveState.manifest;
    const expStr = liveState.expiresAt ? new Date(liveState.expiresAt).toISOString().slice(0, 10) : "Session";
    const activeEmbedUrl = liveState.activeEmbedKey ? buildEmbedUrl(m, liveState.activeEmbedKey) : "";
    const activeDirectRoute = liveState.activeEmbedKey === "roiEmbed"
      ? m.routes.roiDashboard
      : (liveState.activeEmbedKey === "genie" ? m.routes.genie : m.routes.ncrDashboard);
    const activeNormalTabUrl = buildLaunchUrl(m, activeDirectRoute, liveState.routingMode);

    mount.innerHTML =
      '<div class="card">' +
        '<div class="live-unlocked-banner">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="pill-tag tag-green">' + tr("● 正常浏览器云端网关已解锁", "● NORMAL-BROWSER GATEWAY UNLOCKED") + '</span>' +
              '<strong class="mono" style="font-size:13px;">' + escapeHtml(m.workspaceHost) + '</strong>' +
              '<span class="mono" style="font-size:12px;color:var(--text-muted);">org=' + escapeHtml(m.orgId) + '</span>' +
            '</div>' +
            '<div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">' +
              tr("企业主账号 B2B 直连身份：", "Corporate B2B Identity: ") + '<strong class="mono">' + escapeHtml(m.corpLoginHint) + '</strong> · ' +
              tr("缓存有效期至：", "Cached until: ") + '<span class="mono">' + escapeHtml(expStr) + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
            '<button type="button" class="btn btn-sm" id="btnRunProbes">' + tr("🔄 运行云端连通性探测", "🔄 Run Live Connectivity Probes") + '</button>' +
            '<button type="button" class="btn btn-sm" id="btnLockViking">' + tr("🔒 锁定并清除缓存", "🔒 Lock & Clear Cache") + '</button>' +
          '</div>' +
        '</div>' +

        fourFixesHtml +

        '<div class="b2b-redeem-box">' +
          '<div style="flex:1 1 420px;min-width:0;">' +
            '<div style="font-size:13.5px;font-weight:800;color:var(--text-primary);">' +
              tr("🔑 首次在正常 Edge / Chrome 访问？请先点此完成一次性 B2B 邀请激活（仅需点一次！）", "🔑 First Time in Normal Edge / Chrome? Click Once for 1-Click B2B Guest Redemption") +
            '</div>' +
            '<div style="font-size:12px;color:var(--text-secondary);margin-top:3px;">' +
              tr("在已登录企业主账号的正常浏览器中点击右侧按钮，自动确认 Entra B2B 来宾握手并直接跳入「航次 NCR 经营驾驶舱」；此后日常访问直接走下方模式 1 秒开！", "Click once in your normal corporate Edge/Chrome session to accept the Entra B2B handshake and land straight inside NCR Dashboard 1. All subsequent visits open directly via Mode 1 below!") +
            '</div>' +
          '</div>' +
          '<a class="btn btn-emerald" id="btnB2bRedeemOnce" href="' + escapeHtml(m.b2bRedeemUrl) + '" target="_blank" rel="noopener noreferrer">' +
            tr("🔑 首次一键激活 B2B 并进入看板 ↗", "🔑 First-Time 1-Click B2B Activation ↗") +
          '</a>' +
        '</div>' +

        '<div class="live-mode-grid">' +
          '<button type="button" class="live-mode-option ' + (liveState.routingMode === "corp_b2b" ? "active" : "") + '" data-route-mode="corp_b2b">' +
            '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;width:100%;">' +
              '<strong>' + tr("模式 1 · 微软企业主账号 B2B 直连（正常 Edge 首选）", "Mode 1 · Microsoft Corp B2B Direct (Normal Edge Default)") + '</strong>' +
              '<span class="pill-tag tag-green">' + tr("默认推荐", "DEFAULT") + '</span>' +
            '</div>' +
            '<span style="font-size:12px;color:var(--text-secondary);">' +
              tr("自动注入 /aad/auth?login_hint=企业账号&domain_hint=microsoft.com，正常浏览器免隐身直达。", "Routes via /aad/auth with corp login_hint & domain_hint so normal Edge opens Databricks directly without InPrivate.") +
            '</span>' +
          '</button>' +
          '<button type="button" class="live-mode-option ' + (liveState.routingMode === "direct" ? "active" : "") + '" data-route-mode="direct">' +
            '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;width:100%;">' +
              '<strong>' + tr("模式 2 · 已登录会话极速直跳", "Mode 2 · Already-Authenticated Direct URL") + '</strong>' +
              '<span class="pill-tag tag-blue">DIRECT</span>' +
            '</div>' +
            '<span style="font-size:12px;color:var(--text-secondary);">' +
              tr("当前正常浏览器标签页已完成过 Databricks 会话握手时，零跳转直开目标看板路由。", "Opens workspace route directly when your normal browser already holds an active Databricks session cookie.") +
            '</span>' +
          '</button>' +
          '<button type="button" class="live-mode-option ' + (liveState.routingMode === "tenant_admin" ? "active" : "") + '" data-route-mode="tenant_admin">' +
            '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;width:100%;">' +
              '<strong>' + tr("模式 3 · 演示租户管理员 / 本地独立 Profile", "Mode 3 · Lab Tenant Admin / Dedicated Profile") + '</strong>' +
              '<span class="pill-tag tag-purple">LAB ADMIN</span>' +
            '</div>' +
            '<span style="font-size:12px;color:var(--text-secondary);">' +
              tr("携带演示租户管理员 login_hint 或唤醒本地 zava-demo:// 持久化专属浏览器 Profile。", "Uses lab tenant admin login_hint or launches local persistent profile via zava-demo:// protocol.") +
            '</span>' +
          '</button>' +
        '</div>' +

        '<div class="live-probe-grid">' +
          '<div class="live-probe-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;"><strong style="font-size:12.5px;">' + tr("1. 个人网站静态网关", "1. Personal Site Gateway") + '</strong>' + renderProbeBadge(liveState.probes.site.status) + '</div>' +
            '<div class="mono" style="font-size:11.5px;color:var(--text-muted);">' + escapeHtml(liveState.probes.site.detail || tr("点击上方按钮按需探测", "Click Run Probes above")) + '</div>' +
          '</div>' +
          '<div class="live-probe-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;"><strong style="font-size:12.5px;">' + tr("2. Entra ID 租户 OIDC 联合", "2. Entra ID OIDC Federation") + '</strong>' + renderProbeBadge(liveState.probes.oidc.status) + '</div>' +
            '<div class="mono" style="font-size:11.5px;color:var(--text-muted);">' + escapeHtml(liveState.probes.oidc.detail || escapeHtml(m.tenantDomain)) + '</div>' +
          '</div>' +
          '<div class="live-probe-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;"><strong style="font-size:12.5px;">' + tr("3. Azure Databricks 控制面", "3. Azure Databricks Control Plane") + '</strong>' + renderProbeBadge(liveState.probes.dbx.status) + '</div>' +
            '<div class="mono" style="font-size:11.5px;color:var(--text-muted);">' + escapeHtml(liveState.probes.dbx.detail || escapeHtml(m.workspaceHost)) + '</div>' +
          '</div>' +
        '</div>' +

        '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px;">' +
          '<button type="button" class="btn btn-vkg" id="btnOpenAllVikingTabs">' + tr("🚀 正常浏览器一键打开核心实机标签页 (双看板 + Genie)", "🚀 Open Core Live Tabs in Normal Browser (2 Dashboards + Genie)") + '</button>' +
          '<a class="btn btn-ocean" href="' + escapeHtml(buildProtocolUrl(m, "all")) + '">' + tr("⚡ 本机专属 Profile 协议唤醒 (zava-demo://)", "⚡ Launch Local Dedicated Profile (zava-demo://)") + '</a>' +
        '</div>' +

        '<div class="live-routes-grid">' +
          ROUTE_DEFS.map(function (rd) {
            const path = m.routes[rd.key] || "";
            const targetUrl = buildLaunchUrl(m, path, liveState.routingMode);
            const embedBtn = rd.embedKey
              ? '<button type="button" class="btn btn-sm btn-ocean" data-mount-embed="' + escapeHtml(rd.embedKey) + '">' + tr("🖼️ 页内嵌入展示 (&lt;iframe&gt;)", "🖼️ Load Live Embedded &lt;iframe&gt;") + '</button>'
              : "";
            return (
              '<div class="live-route-card">' +
                '<div>' +
                  '<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px;">' +
                    '<span class="pill-tag ' + rd.tone + '">' + rd.badge + '</span>' +
                    '<span class="mono" style="font-size:11px;color:var(--text-muted);">' + escapeHtml(liveState.routingMode) + '</span>' +
                  '</div>' +
                  '<h4 style="margin:0 0 5px;font-size:14.5px;font-weight:800;">' + escapeHtml(tr(rd.title_zh, rd.title_en)) + '</h4>' +
                  '<p style="margin:0;font-size:12.2px;color:var(--text-secondary);">' + escapeHtml(tr(rd.desc_zh, rd.desc_en)) + '</p>' +
                '</div>' +
                '<div class="live-route-actions">' +
                  '<a class="btn btn-sm btn-vkg" data-route-card="' + escapeHtml(rd.key) + '" href="' + escapeHtml(targetUrl) + '" target="_blank" rel="noopener noreferrer">' + tr("↗ 在正常浏览器新标签打开", "↗ Open in Normal Browser Tab") + '</a>' +
                  embedBtn +
                  '<button type="button" class="btn btn-sm" data-copy-url="' + escapeHtml(targetUrl) + '">' + tr("复制链接", "Copy URL") + '</button>' +
                '</div>' +
              '</div>'
            );
          }).join("") +
        '</div>' +

        '<div class="embed-viewer-shell" id="liveEmbedViewerShell">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:10px;">' +
            '<div>' +
              '<h4 style="margin:0;font-size:15px;font-weight:800;">' + tr("🖼️ 个人网站页内实机嵌入视图 (Load Live Embedded Databricks AI/BI Dashboard &lt;iframe&gt;)", "🖼️ In-Page Live Embedded Databricks AI/BI Viewer (&lt;iframe&gt;)") + '</h4>' +
              '<p style="margin:3px 0 0;font-size:12px;color:var(--text-secondary);">' +
                tr("默认零外部 Iframe 挂载；点击下方按钮即可在当前页面内直接加载真实 Azure Databricks AI/BI 看板或 Genie。提示：若浏览器开启了“严格阻止第三方跨站 Cookie”，请先点一次右侧「在正常新标签页打开 ↗」建立会话或允许本站跨站 Cookie。", "Zero external iframes are mounted until you click below. Tip: if strict browser tracking prevention blocks third-party cross-site cookies inside &lt;iframe&gt;, click 'Open in Normal Tab ↗' beside it once to establish your first-party session.") +
              '</p>' +
            '</div>' +
            '<a class="btn btn-sm btn-emerald" href="' + escapeHtml(activeNormalTabUrl) + '" target="_blank" rel="noopener noreferrer">' + tr("↗ 在正常新标签页打开当前视图", "↗ Open Current View in Normal Tab") + '</a>' +
          '</div>' +
          '<div class="embed-toolbar">' +
            '<button type="button" class="btn btn-sm ' + (liveState.activeEmbedKey === "ncrEmbed" ? "btn-vkg" : "") + '" data-mount-embed="ncrEmbed">' + tr("📊 加载嵌入看板 1：航次 NCR 驾驶舱", "📊 Embed Dashboard 1: NCR Cockpit") + '</button>' +
            '<button type="button" class="btn btn-sm ' + (liveState.activeEmbedKey === "roiEmbed" ? "btn-vkg" : "") + '" data-mount-embed="roiEmbed">' + tr("📈 加载嵌入看板 2：全渠道净 ROI", "📈 Embed Dashboard 2: Channel ROI") + '</button>' +
            '<button type="button" class="btn btn-sm ' + (liveState.activeEmbedKey === "genie" ? "btn-vkg" : "") + '" data-mount-embed="genie">' + tr("💬 加载嵌入空间：AI/BI Genie 问数", "💬 Embed AI/BI Genie Space") + '</button>' +
            (liveState.activeEmbedKey ? '<button type="button" class="btn btn-sm" id="btnUnloadEmbed">' + tr("✕ 卸载页内 Iframe", "✕ Unload Iframe") + '</button>' : "") +
          '</div>' +
          '<div class="embed-stage" id="embedIframeStage">' +
            (activeEmbedUrl
              ? '<iframe id="vikingLiveIframe" class="live-embed-iframe" src="' + escapeHtml(activeEmbedUrl) + '" allow="clipboard-write" loading="lazy" title="Embedded Azure Databricks AI/BI View"></iframe>'
              : '<div class="embed-placeholder">' + tr("点击上方任一「加载嵌入看板 / Genie」按钮，在此处按需挂载真实 Azure Databricks 视图（min-height: 760px）。", "Click any 'Embed Dashboard / Genie' button above to mount the live Azure Databricks &lt;iframe&gt; view here on demand (min-height: 760px).") + '</div>') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ================= VIDEO THEATER (5 CHAPTERS) ================= */
  function selectVideoChapter(idx, autoPlay) {
    const cleanIdx = ((idx % VIDEO_CHAPTERS.length) + VIDEO_CHAPTERS.length) % VIDEO_CHAPTERS.length;
    uiState.activeVideoIdx = cleanIdx;
    const ch = VIDEO_CHAPTERS[cleanIdx];

    const videoEl = document.getElementById("vikingWalkthroughVideo");
    const badgeEl = document.getElementById("videoActiveBadge");
    const titleEl = document.getElementById("videoActiveTitle");
    const descEl = document.getElementById("videoActiveDesc");
    const linkEl = document.getElementById("videoDirectLink");

    if (videoEl && videoEl.getAttribute("src") !== ch.src) {
      videoEl.setAttribute("src", ch.src);
      videoEl.load();
    }
    if (autoPlay && videoEl) {
      const p = videoEl.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    }
    if (badgeEl) badgeEl.textContent = ch.badge;
    if (titleEl) titleEl.textContent = tr(ch.title_zh, ch.title_en);
    if (descEl) descEl.textContent = tr(ch.desc_zh, ch.desc_en);
    if (linkEl) linkEl.setAttribute("href", ch.src);

    renderVideoChapterList();
  }

  function renderVideoChapterList() {
    const listEl = document.getElementById("videoChapterList");
    if (!listEl) return;
    listEl.innerHTML = VIDEO_CHAPTERS.map(function (ch) {
      const active = ch.idx === uiState.activeVideoIdx ? " active" : "";
      return (
        '<button type="button" class="video-chapter-btn' + active + '" data-chapter-idx="' + ch.idx + '">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;">' +
            '<span class="pill-tag ' + (ch.idx === uiState.activeVideoIdx ? "tag-red" : "tag-blue") + '">' + ch.badge + '</span>' +
            '<span class="mono" style="font-size:11px;color:var(--text-muted);">' + escapeHtml(ch.duration) + '</span>' +
          '</div>' +
          '<strong style="font-size:13px;">' + escapeHtml(tr(ch.title_zh, ch.title_en)) + '</strong>' +
          '<span style="font-size:11.8px;color:var(--text-secondary);">' + escapeHtml(tr(ch.desc_zh, ch.desc_en)) + '</span>' +
        '</button>'
      );
    }).join("");
  }

  /* ================= DELEGATED EVENT WIRING (ZERO INLINE HANDLERS) ================= */
  function bindEvents() {
    // Act 1 Subtabs (1A vs 1B)
    document.querySelectorAll("[data-act1-subtab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-act1-subtab");
        uiState.act1Subtab = target;
        document.querySelectorAll("[data-act1-subtab]").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-act1-subtab") === target);
        });
        document.querySelectorAll("[data-subtab-panel]").forEach(function (panel) {
          panel.classList.toggle("active", panel.getAttribute("data-subtab-panel") === target);
        });
      });
    });

    // Scenario 1 Health Filter Chips
    document.querySelectorAll("[data-s1-health]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        uiState.s1HealthFilter = chip.getAttribute("data-s1-health");
        document.querySelectorAll("[data-s1-health]").forEach(function (c) {
          c.classList.toggle("active", c.getAttribute("data-s1-health") === uiState.s1HealthFilter);
        });
        renderScenario1();
      });
    });

    const regionSel = document.getElementById("s1RegionSelect");
    if (regionSel) {
      regionSel.addEventListener("change", function () {
        uiState.s1RegionFilter = regionSel.value;
        renderScenario1();
      });
    }

    const sortSel = document.getElementById("s1SortSelect");
    if (sortSel) {
      sortSel.addEventListener("change", function () {
        uiState.s1Sort = sortSel.value;
        renderScenario1();
      });
    }

    // Genie Scenario Switcher
    document.querySelectorAll("[data-genie-key]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        uiState.activeGenieKey = btn.getAttribute("data-genie-key");
        renderGenieLab();
      });
    });

    // Scenario 5 QA Risk Chips
    document.querySelectorAll("[data-qa-risk]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        uiState.qaRiskFilter = chip.getAttribute("data-qa-risk");
        document.querySelectorAll("[data-qa-risk]").forEach(function (c) {
          c.classList.toggle("active", c.getAttribute("data-qa-risk") === uiState.qaRiskFilter);
        });
        renderScenario5();
      });
    });

    // Scenario 6 Guardrail Tabs
    document.querySelectorAll("[data-s6-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        uiState.s6Tab = btn.getAttribute("data-s6-tab");
        renderScenario6();
      });
    });

    // Video Controls
    const btnPrev = document.getElementById("btnVideoPrev");
    const btnNext = document.getElementById("btnVideoNext");
    const videoEl = document.getElementById("vikingWalkthroughVideo");
    if (btnPrev) btnPrev.addEventListener("click", function () { selectVideoChapter(uiState.activeVideoIdx - 1, true); });
    if (btnNext) btnNext.addEventListener("click", function () { selectVideoChapter(uiState.activeVideoIdx + 1, true); });
    if (videoEl) {
      videoEl.addEventListener("ended", function () {
        if (uiState.activeVideoIdx < VIDEO_CHAPTERS.length - 1) {
          selectVideoChapter(uiState.activeVideoIdx + 1, true);
        }
      });
    }

    // Global Document Delegation for Dynamic Elements
    document.addEventListener("click", function (ev) {
      const sailingEl = ev.target.closest("[data-select-sailing]");
      if (sailingEl) {
        uiState.selectedSailingId = sailingEl.getAttribute("data-select-sailing");
        renderScenario1();
        return;
      }

      const qaEl = ev.target.closest("[data-select-qa]");
      if (qaEl) {
        uiState.selectedQaId = qaEl.getAttribute("data-select-qa");
        renderScenario5();
        return;
      }

      const chBtn = ev.target.closest("[data-chapter-idx]");
      if (chBtn) {
        selectVideoChapter(Number(chBtn.getAttribute("data-chapter-idx")) || 0, true);
        return;
      }

      const modeBtn = ev.target.closest("[data-route-mode]");
      if (modeBtn) {
        liveState.routingMode = modeBtn.getAttribute("data-route-mode");
        renderLiveGateway();
        return;
      }

      const embedBtn = ev.target.closest("[data-mount-embed]");
      if (embedBtn && liveState.unlocked) {
        liveState.activeEmbedKey = embedBtn.getAttribute("data-mount-embed");
        renderLiveGateway();
        const shell = document.getElementById("liveEmbedViewerShell");
        if (shell && shell.scrollIntoView) shell.scrollIntoView({ behavior: "auto", block: "nearest" });
        return;
      }

      if (ev.target.closest("#btnUnloadEmbed")) {
        liveState.activeEmbedKey = null;
        renderLiveGateway();
        return;
      }

      if (ev.target.closest("#btnToggleVikingPass")) {
        const inp = document.getElementById("vikingPassInput");
        const toggle = document.getElementById("btnToggleVikingPass");
        if (inp && toggle) {
          const isPwd = inp.type === "password";
          inp.type = isPwd ? "text" : "password";
          toggle.textContent = isPwd ? tr("隐藏", "Hide") : tr("显示", "Show");
        }
        return;
      }

      if (ev.target.closest("#btnLockViking")) {
        clearUnlockedSession();
        return;
      }

      if (ev.target.closest("#btnRunProbes")) {
        runLiveProbes();
        return;
      }

      if (ev.target.closest("#btnOpenAllVikingTabs") && liveState.unlocked && liveState.manifest) {
        const m = liveState.manifest;
        [m.routes.ncrDashboard, m.routes.roiDashboard, m.routes.genie].forEach(function (rPath, idx) {
          setTimeout(function () {
            window.open(buildLaunchUrl(m, rPath, liveState.routingMode), "_blank", "noopener,noreferrer");
          }, idx * 220);
        });
        return;
      }

      const copyBtn = ev.target.closest("[data-copy-url]");
      if (copyBtn) {
        const url = copyBtn.getAttribute("data-copy-url") || "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            const orig = copyBtn.textContent;
            copyBtn.textContent = tr("✓ 已复制", "✓ Copied");
            setTimeout(function () { copyBtn.textContent = orig; }, 1400);
          }).catch(function () {});
        }
      }
    });

    document.addEventListener("change", function (ev) {
      if (ev.target && ev.target.id === "chkVikingRemember") {
        liveState.remember30d = !!ev.target.checked;
      }
    });

    document.addEventListener("submit", async function (ev) {
      if (!ev.target || ev.target.id !== "vikingGateForm") return;
      ev.preventDefault();
      const inp = document.getElementById("vikingPassInput");
      const btn = document.getElementById("btnUnlockViking");
      const pass = inp ? inp.value : "";
      liveState.errorMsg = "";
      liveState.infoMsg = "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = tr("解密验证中…", "Decrypting…");
      }
      try {
        const res = await decryptLiveOrFixture(pass);
        liveState.unlocked = true;
        liveState.isFixture = res.isFixture;
        liveState.manifest = res.manifest;
        saveUnlockedSession(res.manifest);
        updateHeaderLiveStatus();
        renderLiveGateway();
        await runLiveProbes();
      } catch (_) {
        liveState.errorMsg = tr("口令校验未通过：无法解密云端路由凭证，请核对 Diamond 演示口令后重试。", "Passcode verification failed: unable to decrypt cloud manifest. Check passcode and retry.");
        renderLiveGateway();
      }
    });
  }

  /* ================= AUTOMATED HEADLESS FIXTURE VERIFIER ================= */
  window.__vikingVerifyFixture = async function (passcode, customBundle) {
    const m = await decryptManifestBundle(passcode || "unit-test-fixture-only", customBundle || FIXTURE_BUNDLE);
    return {
      ok: true,
      sailings: SAILINGS.length,
      channels: CHANNELS.length,
      csTeams: CS_FUNNEL_TEAMS.length,
      qaRows: QA_AUDITS.length,
      videos: VIDEO_CHAPTERS.length,
      manifest: m,
      sampleCorpB2bUrl: buildLaunchUrl(m, m.routes.ncrDashboard, "corp_b2b"),
      sampleDirectUrl: buildLaunchUrl(m, m.routes.ncrDashboard, "direct"),
      sampleTenantAdminUrl: buildLaunchUrl(m, m.routes.ncrDashboard, "tenant_admin"),
      sampleRedeemUrl: m.b2bRedeemUrl,
      sampleEmbedNcrUrl: buildEmbedUrl(m, "ncrEmbed"),
      sampleEmbedRoiUrl: buildEmbedUrl(m, "roiEmbed"),
      sampleEmbedGenieUrl: buildEmbedUrl(m, "genie"),
      sampleProtocolUrl: buildProtocolUrl(m, "all")
    };
  };

  /* ================= BOOTSTRAP ================= */
  async function init() {
    initTheme();
    initDrawioLinks();
    renderScenario1();
    renderScenario2();
    renderGenieLab();
    renderScenario5();
    renderScenario6();
    renderVideoChapterList();
    bindEvents();

    const hashToken = consumeHashUnlockParam();
    const restored = restoreUnlockedSession();
    updateHeaderLiveStatus();
    renderLiveGateway();

    if (hashToken) {
      try {
        const res = await decryptLiveOrFixture(hashToken);
        liveState.unlocked = true;
        liveState.isFixture = res.isFixture;
        liveState.manifest = res.manifest;
        saveUnlockedSession(res.manifest);
        updateHeaderLiveStatus();
        renderLiveGateway();
        if (res.isFixture) {
          await runLiveProbes();
        }
        const liveSec = document.getElementById("act-live");
        if (liveSec && liveSec.scrollIntoView) liveSec.scrollIntoView({ behavior: "instant", block: "start" });
      } catch (_) {
        liveState.errorMsg = tr("URL 自动解锁口令无效，请手动输入口令。", "Auto-unlock passcode in URL hash was invalid.");
        renderLiveGateway();
      }
    } else if (restored) {
      updateHeaderLiveStatus();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
