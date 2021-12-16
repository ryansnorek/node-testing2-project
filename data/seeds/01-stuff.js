const stuff = [
    { name: 'theraband' },
    { name: 'jar' },
    { name: 'windex' },
    { name: 'table' },
    { name: 'candle' },
    { name: 'paper' },
    { name: 'compooter' },
  ]
  
  exports.stuff = stuff
  
  exports.seed = function (knex) {
    return knex('stuff').insert(stuff)
  }